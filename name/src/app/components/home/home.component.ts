import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      (error) => {
        console.error('Error fetching product data:', error);
      }
    );
  }

  onFilterCriteria(filterData: any) {
    // Check if itemNameFilter is defined and not an empty string
    const itemNameFilterValid = filterData.productTitle && filterData.productTitle.trim() !== '';

    this.filteredProducts = this.products.filter((product) => {
      const minPriceFilterPassed = product.listOfPlans[0]?.price.amount >= filterData.minPrice;
      const maxPriceFilterPassed = product.listOfPlans[0]?.price.amount <= filterData.maxPrice;

      // Check if itemNameFilter is valid and if the cardTitle contains the filter (case-insensitive)
      const itemNameFilterPassed = !itemNameFilterValid || product.cardTitle?.toLowerCase().includes(filterData.productTitle.toLowerCase());

      return minPriceFilterPassed && maxPriceFilterPassed && itemNameFilterPassed;
    });

    if (filterData.orderBy === 'Aasc') {
      this.filteredProducts.sort((a, b) => a.cardTitle.localeCompare(b.cardTitle, 'en', { sensitivity: 'base' }));
    } else if (filterData.orderBy === 'Adesc') {
      this.filteredProducts.sort((a, b) => b.cardTitle.localeCompare(a.cardTitle, 'en', { sensitivity: 'base' }));
    } else if (filterData.orderBy === 'Pasc') {
      this.filteredProducts.sort((a, b) => a.listOfPlans[0].price.amount - b.listOfPlans[0].price.amount);
    } else if (filterData.orderBy === 'Pdesc') {
      this.filteredProducts.sort((a, b) => b.listOfPlans[0].price.amount - a.listOfPlans[0].price.amount);
    }
  }
}
