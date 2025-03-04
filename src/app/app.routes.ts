import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { HomeComponent } from '../../.bac/home/home.component';

export const routes: Routes = [
  { path: 'home-component', component: HomeComponent },
  { path: 'navbar-component', component: NavbarComponent }
];
