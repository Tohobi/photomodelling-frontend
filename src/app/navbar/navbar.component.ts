import { Component } from '@angular/core';
import { GenericButtonComponent} from '../generic-button/generic-button.component';

@Component({
  selector: 'navbar',
  imports: [GenericButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  showButtonClicked() {
    console.log('Benutzer clicked');
  }
}
