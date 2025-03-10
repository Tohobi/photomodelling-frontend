import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GenericButtonComponent,
    BottomBarComponent,
    ContentContainerComponent
  ],
  imports: [
    //CommonModule,
    BrowserModule
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
