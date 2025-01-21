import { Component, OnInit } from '@angular/core'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

export interface Category {
  category_id: number;
  category_name: string;
}

@Component({
  selector: 'app-category-master',
  templateUrl: './category-master.component.html',
  styleUrls: ['./category-master.component.css'],
  imports: [FormsModule, HttpClientModule, CommonModule], 
})
export class CategoryMasterComponent implements OnInit {
  backendUrl = 'http://localhost:3000'; 
  categories: Category[] = []; 
  categoryName: string = ''; 
  updatedCategoryName: string = ''; 
  categoryToEdit: number | null = null; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCategories();  
  }

  fetchCategories(): void {
    this.http.get<Category[]>(`${this.backendUrl}/categories`).subscribe({
      next: (data) => {
        this.categories = data; 
      },
      error: (err) => {
        console.error('Error fetching categories:', err);  
      },
    });
  }

  addCategory(): void {
    if (this.categoryName.trim()) {  
      const newCategory = { category_name: this.categoryName };

      this.http.post<Category>(`${this.backendUrl}/categories`, newCategory).subscribe(
        (response) => {
          console.log('Category added successfully:', response);

          
          this.categories.push({ 
            category_id: response.category_id, 
            category_name: response.category_name 
          });

          
          this.categoryName = '';
        },
        (error) => {
          console.error('Failed to add category:', error);
        }
      );
    }
  }

  
  editCategory(category: Category): void {
    this.categoryToEdit = category.category_id; 
    this.updatedCategoryName = category.category_name; 
  }


  saveCategory(id: number): void {
    if (this.updatedCategoryName.trim()) {
      const updatedCategory = { category_name: this.updatedCategoryName };

      this.http.put(`${this.backendUrl}/categories/${id}`, updatedCategory).subscribe({
        next: () => {
          const category = this.categories.find(c => c.category_id === id);
          if (category) {
            category.category_name = this.updatedCategoryName; 
          }
          this.categoryToEdit = null; 
        },
        error: (err) => {
          console.error('Error updating category:', err);
        }
      });
    }
  }

  deleteCategory(id: number): void {
    this.http.delete(`${this.backendUrl}/categories/${id}`).subscribe({
      next: () => {
        this.categories = this.categories.filter((category) => category.category_id !== id);
      },
      error: (err) => {
        console.error('Error deleting category:', err);
      }
    });
  }
}
