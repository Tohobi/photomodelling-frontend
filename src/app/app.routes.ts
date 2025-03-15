import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { HomeComponent } from '../../.bac/home/home.component';
import {MyProjectsComponent} from './pages/my-projects/my-projects.component';
import {OtherProjectsComponent} from './pages/other-projects/other-projects.component';

export const routes: Routes = [{
  path: 'my-projects',
  pathMatch: 'full',
  component: MyProjectsComponent
},
{
  path: 'other-projects',
  component: OtherProjectsComponent
}
];
