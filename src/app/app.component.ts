import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {BottomBarComponent} from './bottom-bar/bottom-bar.component';
import {ContentContainerComponent} from './content-container/content-container.component';

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
}
