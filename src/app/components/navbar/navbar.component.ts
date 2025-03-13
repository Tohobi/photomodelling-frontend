import { Component } from '@angular/core';
import { GenericButtonComponent} from '../generic-button/generic-button.component';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'navbar',
  imports: [
    GenericButtonComponent,
    RouterOutlet,
    RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  showButtonClicked() {
    console.log('Benutzer clicked');
  }
}
