import { Component, OnInit, ChangeDetectorRef,NgZone  } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
interface Product {
  product_id: number;
  product_name: string;
  category_id: number;
  categoryName: string;
}

interface Category {
  category_id: number;
  category_name: string;
}

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css'],
  imports: [ReactiveFormsModule, CommonModule, FormsModule, HttpClientModule],
})
export class ProductMasterComponent implements OnInit {
  backendUrl = 'http://localhost:3000';
  products: Product[] = [];
  categories: Category[] = [];
  newProduct = { product_name: '', category_id: null };
  productError: string = '';
  currentPage = 1;
  pageSize = 10;
  totalProducts = 0;
  totalPages = 0;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchProducts();
    this.fetchProductCount();
  }

  fetchCategories() {
    this.http.get<Category[]>(`${this.backendUrl}/categories`).subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  fetchProducts() {
    this.http
      .get<any>(`${this.backendUrl}/products?page=${this.currentPage}&pageSize=${this.pageSize}`)
      .subscribe({
        next: (data) => {
          this.products = Array.isArray(data) ? data : data.products || [];
          this.totalPages = data.totalPages;
          this.ngZone.run(() => {
            this.cdr.detectChanges();
          });
        },
        error: (err) => {
          console.error('Error fetching products:', err);
        }
      });
  }

  fetchProductCount() {
    this.http.get<{ count: number }>(`${this.backendUrl}/products/count`).subscribe({
      next: (data) => {
        this.totalProducts = data.count;
        this.ngZone.run(() => {
          this.cdr.detectChanges(); 
        });
      },
      error: (err) => {
        console.error('Error fetching total products:', err);
      }
    });
  }

  onSubmit() {
    const { product_name, category_id } = this.newProduct;
    if (!product_name || !category_id) {
      this.productError = 'Both product name and category must be selected!';
      return;
    } else {
      this.productError = ''; 
    }

    this.http.post(`${this.backendUrl}/products`, { product_name, category_id }).pipe(
      switchMap(() => {
        return this.http.get<any>(`${this.backendUrl}/products?page=${this.currentPage}&pageSize=${this.pageSize}`);
      })
    ).subscribe({
      next: (data) => {
        this.products = Array.isArray(data) ? data : data.products || [];
        this.totalPages = data.totalPages;
        this.fetchProductCount(); 
        this.newProduct = { product_name: '', category_id: null }; 
      },
      error: (err) => {
        console.error('Error adding product:', err);
      }
    });
  }

  deleteProduct(productId: number) {
    this.http.delete(`${this.backendUrl}/products/${productId}`).pipe(
      switchMap(() => {
        return this.http.get<any>(`${this.backendUrl}/products?page=${this.currentPage}&pageSize=${this.pageSize}`);
      })
    ).subscribe({
      next: (data) => {
        this.products = Array.isArray(data) ? data : data.products || [];
        this.totalPages = data.totalPages;
        this.fetchProductCount(); 
      },
      error: (err) => {
        console.error('Error deleting product:', err);
      }
    });
  }

  goToPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchProducts();  
    }
  }
    getTotalPages() {
    return Math.ceil(this.totalProducts / this.pageSize);
  }
}