import {Component, input, output} from '@angular/core';

@Component({
  selector: 'generic-button',
  imports: [],
  templateUrl: './generic-button.component.html',
  styleUrl: './generic-button.component.css'
})
export class GenericButtonComponent {
  label = input('');

  btnClicked = output();
}
