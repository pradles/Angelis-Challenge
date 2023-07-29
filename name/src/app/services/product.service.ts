import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private jsonDataPath = '../../assets/products.json';

  constructor(private http: HttpClient) {}

  // Method to get all products from the JSON file
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonDataPath);
  }

  // Method to get a specific product by its ID from the JSON file
  getProductById(id: string): Observable<any> {
    return this.http.get<any[]>(this.jsonDataPath).pipe(
      map(data => data.find(item => item.id === id))
    );
  }
}
