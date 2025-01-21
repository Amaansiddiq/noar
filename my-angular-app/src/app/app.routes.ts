import { Routes } from '@angular/router';
import { ProductMasterComponent } from './product-master/product-master.component';
import { CategoryMasterComponent } from './category-master/category-master.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },  
  { path: 'products', component:ProductMasterComponent },
  { path: 'categories', component:CategoryMasterComponent },

];
