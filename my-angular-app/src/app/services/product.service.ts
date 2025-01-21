const backendUrl = 'http://localhost:3000'; 

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Product {
  id: number;
  name: string;
  categoryId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsEndpoint = `${backendUrl}/products`;

  constructor(private http: HttpClient) {}


  getProducts(page: number = 1, pageSize: number = 10): Observable<{ products: Product[]; totalPages: number; currentPage: number }> {
    return this.http.get<{ products: Product[]; totalPages: number; currentPage: number }>(
      `${this.productsEndpoint}?page=${page}&pageSize=${pageSize}`
    );
  }

  addProduct(product: Product): Observable<void> {
    return this.http.post<void>(this.productsEndpoint, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productsEndpoint}/${id}`);
  }
}
