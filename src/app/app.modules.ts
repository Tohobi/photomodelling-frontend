import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProjectComponent } from '../../.bac/project/project.component';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../.bac/service/project.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { GenericButtonComponent } from './components/generic-button/generic-button.component';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { ContentContainerComponent} from './components/content-container/content-container.component';
import {MyProjectsComponent} from "./pages/my-projects/my-projects.component";
import {OtherProjectsComponent} from './pages/other-projects/other-projects.component';
import {DialogComponent} from './dialog/dialog.component';

export const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: MyProjectsComponent
},
{
  path: 'other-projects'
  component: OtherProjectsComponent
}

];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        GenericButtonComponent,
        BottomBarComponent,
        ContentContainerComponent,
        MyProjectsComponent,
        OtherProjectsComponent,
        DialogComponent
    ],
  imports: [
    //CommonModule,
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    // {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: JsonDateInterceptor,
    //     multi: true
    //   }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
