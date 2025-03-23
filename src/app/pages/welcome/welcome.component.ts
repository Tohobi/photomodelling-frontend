import { Component } from '@angular/core';
import {GenericButtonComponent} from '../../components/generic-button/generic-button.component';

@Component({
  selector: 'app-welcome',
  imports: [
    GenericButtonComponent
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
