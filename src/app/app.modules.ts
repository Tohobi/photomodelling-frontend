import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProjectComponent } from '../../.bac/project/project.component';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../.bac/service/project.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { GenericButtonComponent } from './generic-button/generic-button.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { ContentContainerComponent} from './content-container/content-container.component';
import {MyProjectsComponent} from "./pages/my-projects/my-projects.component";
import {OtherProjectsComponent} from './pages/other-projects/other-projects.component';

const routes: Routes = [
  { path: '', component: MyProjectsComponent},
  { path: 'other-projects', component: OtherProjectsComponent},
];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        GenericButtonComponent,
        BottomBarComponent,
        ContentContainerComponent,
        MyProjectsComponent,
        OtherProjectsComponent
    ],
  imports: [
    //CommonModule,
    BrowserModule,
    RouterModule,forRoot(routes)
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
