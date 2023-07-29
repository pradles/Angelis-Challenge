import { Component, Output, EventEmitter } from '@angular/core';

// Interface for defining sorting options
interface OrderBy {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() filterCriteria = new EventEmitter<any>();

  // Initial values for filtering criteria
  minPrice: number = 0;
  maxPrice: number = 10000;
  productTitle: string = "";
  sliderValue: number = 0;
  orderBy: string = "asc";

  // List of sorting options for the dropdown
  order: OrderBy[] = [
    { value: 'Aasc', viewValue: 'Alphabetically ascending' },
    { value: 'Adesc', viewValue: 'Alphabetically descending' },
    { value: 'Pasc', viewValue: 'Price ascending' },
    { value: 'Pdesc', viewValue: 'Price descending' },
  ];

  // Function to apply the filter criteria and emit the data to the parent component
  applyFilter() {
    const filterData = {
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      productTitle: this.productTitle,
      orderBy: this.orderBy,
      // Add more filtering criteria as needed
    };

    this.filterCriteria.emit(filterData);
  }
}

export class SliderFormattingExample {
  // Function to format the label for the slider based on the value
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k'; // Display value in 'k' (e.g., 1k, 2k, etc.) if it's greater than or equal to 1000
    }

    return `${value}`; // Otherwise, display the original value
  }
}
