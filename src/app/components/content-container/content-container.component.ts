import { Component } from '@angular/core';
import {GenericButtonComponent} from '../generic-button/generic-button.component';
import {MyProjectsComponent} from '../../pages/my-projects/my-projects.component';
import {RouterOutlet} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-content-container',
  imports: [
    GenericButtonComponent,
    MyProjectsComponent,
    RouterOutlet
  ],
  templateUrl: './content-container.component.html',
  styleUrl: './content-container.component.css'
})
export class ContentContainerComponent {

  showButtonClicked() {
    console.log('content clicked');
  }

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '300px',
      data: { message: 'Hallo vom Popup!' }
    });
  }

}
