import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatDialogContent} from '@angular/material/dialog';
import {GenericButtonComponent} from '../components/generic-button/generic-button.component';
import {MyProjectsComponent} from '../pages/my-projects/my-projects.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-dialog',
  imports: [
    MatDialogContent,
    RouterOutlet
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './content-container.component.css'
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  close() {
    this.dialogRef.close();
  }
}
