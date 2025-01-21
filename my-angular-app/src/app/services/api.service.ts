import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private backendUrl = 'http://localhost:3000';  

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(`${this.backendUrl}/categories`);
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.backendUrl}/products`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/products`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.backendUrl}/products/${id}`);
  }
}
