import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project } from '../model/project'

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

  @Input() project!: Project;
  // myVar: any;

  ngOnInit(): void {
    this.project = new Project();
    this.project.id = 12345;
    this.project.name = "My Kitten";
  }

}

