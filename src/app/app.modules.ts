import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { CommonModule } from '@angular/common';
import { ProjectService } from './service/project.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    // AppComponent,
    // ProjectComponent

  ],
  imports: [CommonModule],
  providers: [
    ProjectService,
    // {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: JsonDateInterceptor,
    //     multi: true
    //   }
  ],
})
export class AppModule { }
