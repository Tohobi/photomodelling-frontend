import {Component, signal} from '@angular/core';
import { GenericButtonComponent} from '../../components/generic-button/generic-button.component';
import {Project} from '../../models/projects.model';

@Component({
  selector: 'app-other-projects',
  imports: [
    GenericButtonComponent
  ],
  templateUrl: './other-projects.component.html',
  styleUrl: './other-projects.component.css'
})
export class OtherProjectsComponent {
  myProjects = signal<Project[]>([
    {
      id: 1,
      title: 'Bennos Project',
      owner: 'Benno'
    },
    {
      id: 2,
      title: 'Tobis Project',
      owner: 'Tobi'
    },
    {
      id: 3,
      title: 'Test Projekt',
      owner: 'User'
    }
  ]);
}
