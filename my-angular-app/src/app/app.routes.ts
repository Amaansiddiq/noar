import { Routes } from '@angular/router';
import { ProductMasterComponent } from './product-master/product-master.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },  
  { path: 'products', component:ProductMasterComponent },
];
