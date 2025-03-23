import { Component } from '@angular/core';
import { GenericButtonComponent} from '../generic-button/generic-button.component';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'navbar',
  imports: [
    GenericButtonComponent,
    RouterOutlet,
    RouterLink,
    DialogComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  showButtonClicked() {
    console.log('Benutzer clicked');
  }

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '300px',
      data: { message: 'Hallo vom Popup!' }
    });
  }
}
