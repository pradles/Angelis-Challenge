import { Component, OnInit, Inject } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-preview-component',
  templateUrl: './cart-preview-component.component.html',
  styleUrls: ['./cart-preview-component.component.css']
})
export class CartPreviewComponentComponent implements OnInit {
  cartItems: any;
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private dialogRef: MatDialogRef<CartPreviewComponentComponent>, // Inject MatDialogRef
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {}
  
  ngOnInit(): void {
    // Initialize the component by fetching products for cart items
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

  // Close the dialog
  onCloseDialog(): void {
    this.dialogRef.close();
  }
}
