import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import {  HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [HttpClientModule,RouterModule,RouterOutlet,CommonModule]
})
export class AppComponent{
     title = 'Crud Project';
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(),
    provideRouter(routes)  
  ]
});
