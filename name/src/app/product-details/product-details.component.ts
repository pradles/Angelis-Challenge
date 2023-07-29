import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  isInCart: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    // Get the productId from the route parameters
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      this.isInCart = this.cartService.isInCart(productId);

      // Fetch the product details based on productId
      this.productService.getProductById(productId).subscribe(
        (product) => {
          this.product = product;
          console.log("product:", product);
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
    });
  }

  // Function to add the product to the cart
  addToCart(productId: string): void {
    this.cartService.addToCart(productId, 1);
    console.log(this.cartService.getCartItems());
  }
}
