import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any;
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    // Initialize the component
    this.getProductsForCartItems();
  }

  // Fetch products corresponding to the cart items
  getProductsForCartItems(): void {
    this.cartItems = this.cartService.getCartItems();

    // Loop through each cart item and fetch the corresponding product
    for (const cartItem of this.cartItems) {
      const productId = cartItem.productId; // Get the product ID from the cart item

      // Fetch the product details using the product service
      this.productService.getProductById(productId).subscribe(
        (product) => {
          // Push the product details into the products array
          this.products.push(product);
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
    }
  }

  // Get the total count of all items in the cart
  getAllCount(): number {
    return this.cartService.getTotalItems();
  }

  // Get the count of a specific product in the cart
  getProductCount(productId: string): number {
    return this.cartService.getItemQuantity(productId);
  }

  // Add one quantity of a product to the cart
  addProduct(productId: string): void {
    this.cartService.updateCartItemQuantity(productId, 1);
  }

  // Subtract one quantity of a product from the cart
  subProduct(productId: string): void {
    this.cartService.updateCartItemQuantity(productId, -1);
  }

  // Remove a product from the cart
  removeProduct(productId: string): void {
    this.cartService.removeFromCart(productId);

    // Remove the product from the products array as well
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  // Calculate the total price of all products in the cart
  getTotalPrice(): number {
    let totalPrice = 0;
    for (const product of this.products) {
      totalPrice += product.listOfPlans[0].price.amount * this.getProductCount(product.id);
    }
    return totalPrice;
  }

  // Calculate the total shipping cost for all products in the cart
  getTotalShippingCost(): number {
    let totalShippingCost = 0;
    for (const product of this.products) {
      if (product?.listOfPlans[0]?.isShippingChargesRequired === true) {
        totalShippingCost += product.listOfPlans[0].shippingCharges.amount;
      }
    }
    return totalShippingCost;
  }

  // Calculate the total cost of all products including shipping charges
  getTotalProductCost(): number {
    return this.getTotalPrice() + this.getTotalShippingCost();
  }

  // Clear the entire cart
  clearCart(): void {
    this.cartService.clearCart();
  }
}
