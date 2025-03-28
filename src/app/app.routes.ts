import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { HomeComponent } from '../../.bac/home/home.component';
import {MyProjectsComponent} from './pages/my-projects/my-projects.component';
import {OtherProjectsComponent} from './pages/other-projects/other-projects.component';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {EditProjectComponent} from './pages/edit-project/edit-project.component';
import {AuthGuard} from './guards/auth.guard';

export const routes: Routes = [{
  path: 'my-projects',
  pathMatch: 'full',
  component: MyProjectsComponent,
  canActivate: [AuthGuard]
},
{
  path: 'other-projects',
  pathMatch: 'full',
  component: OtherProjectsComponent,
  canActivate: [AuthGuard]
},
{
  path: '',
  pathMatch: 'full',
  component: WelcomeComponent
},
{
  path: 'edit-project/:id',
  pathMatch: 'full',
  component: EditProjectComponent,
  canActivate: [AuthGuard]
}
];
