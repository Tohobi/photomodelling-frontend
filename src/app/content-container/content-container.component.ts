import { Component } from '@angular/core';
import {GenericButtonComponent} from '../generic-button/generic-button.component';

@Component({
  selector: 'app-content-container',
  imports: [GenericButtonComponent],
  templateUrl: './content-container.component.html',
  styleUrl: './content-container.component.css'
})
export class ContentContainerComponent {

  showButtonClicked() {
    console.log('content clicked');
  }

}
