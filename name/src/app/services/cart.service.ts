import { Injectable } from '@angular/core';
import { ProductService } from './product.service';

// Interface representing the cart item structure
interface CartItem {
  productId: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Map<string, number> = new Map();
  private storageKey = 'cartItems'; // Key used for storing cart data in localStorage

  constructor(private productService: ProductService) {
    // Load cart data from localStorage on service initialization
    this.loadCartData();
  }

  // Private method to load cart data from localStorage
  private loadCartData(): void {
    const cartDataJson = localStorage.getItem(this.storageKey);
    if (cartDataJson) {
      this.cartItems = new Map(JSON.parse(cartDataJson));
    }
  }

  // Private method to save cart data to localStorage
  private saveCartData(): void {
    const cartDataJson = JSON.stringify(Array.from(this.cartItems.entries()));
    localStorage.setItem(this.storageKey, cartDataJson);
  }

  // Method to add a product to the cart
  addToCart(productId: string, quantity: number): void {
    if (quantity <= 0) {
      return;
    }

    const currentQuantity = this.cartItems.get(productId) || 0;
    this.cartItems.set(productId, currentQuantity + quantity);

    this.saveCartData(); // Save cart data to localStorage after modification
  }

  // Method to remove a product from the cart
  removeFromCart(productId: string): void {
    this.cartItems.delete(productId);
    this.saveCartData(); // Save cart data to localStorage after modification
  }

  // Method to update the quantity of a product in the cart
  updateCartItemQuantity(productId: string, quantity: number): void {
    const currentQuantity = this.cartItems.get(productId) || 0;
    const updatedQuantity = currentQuantity + quantity;
    let limit = Infinity;

    this.productService.getProductById(productId).subscribe(
      (product) => {
        limit = product.maxQuantityPerUser ? product.maxQuantityPerUser : product.availableQuantity;

        if (updatedQuantity <= 0) {
          this.removeFromCart(productId);
        } else {
          if (updatedQuantity <= limit) {
            this.cartItems.set(productId, updatedQuantity);
          } else {
            this.cartItems.set(productId, limit);
          }
        }

        this.saveCartData(); // Save cart data to localStorage after modification
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  // Method to check if a product is in the cart
  isInCart(productId: string): boolean {
    return this.cartItems.has(productId);
  }

  // Method to get the cart items as an array of CartItem objects
  getCartItems(): CartItem[] {
    return Array.from(this.cartItems.entries()).map(([productId, quantity]) => ({
      productId,
      quantity,
    }));
  }

  // Method to get the total number of items in the cart
  getTotalItems(): number {
    let totalItems = 0;
    this.cartItems.forEach((quantity) => (totalItems += quantity));
    return totalItems;
  }

  // Method to get the quantity of a specific product in the cart
  getItemQuantity(productId: string): number {
    const quantity = this.cartItems.get(productId);
    return quantity !== undefined ? quantity : 0;
  }

  // Method to clear the cart and save the changes to localStorage
  clearCart(): void {
    this.cartItems.clear();
    this.saveCartData(); // Save cart data to localStorage after modification
  }
}
