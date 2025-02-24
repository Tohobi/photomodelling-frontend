import { Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'home-component', component: HomeComponent },
  { path: 'project-component', component: ProjectComponent }
];
