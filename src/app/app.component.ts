import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import {BottomBarComponent} from './components/bottom-bar/bottom-bar.component';
import {ContentContainerComponent} from './components/content-container/content-container.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent} from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    BottomBarComponent,
    ContentContainerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'photomodelling-frontend';

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '300px',
      data: { message: 'Hallo vom App-Popup!' }
    });
  }

}
