import { Component } from '@angular/core';
import {GenericButtonComponent} from '../generic-button/generic-button.component';
import {MyProjectsComponent} from '../pages/my-projects/my-projects.component';

@Component({
  selector: 'app-content-container',
  imports: [
    GenericButtonComponent,
    MyProjectsComponent,
  ],
  templateUrl: './content-container.component.html',
  styleUrl: './content-container.component.css'
})
export class ContentContainerComponent {

  showButtonClicked() {
    console.log('content clicked');
  }

}
