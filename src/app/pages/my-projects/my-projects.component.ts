import { Component, signal } from '@angular/core';
import { GenericButtonComponent} from '../../components/generic-button/generic-button.component';
import {Project} from '../../models/projects.model';

import {ContentContainerComponent} from '../../components/content-container/content-container.component';

@Component({
  selector: 'my-projects',
  imports: [
    GenericButtonComponent
  ],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.css'
})
export class MyProjectsComponent {
  async ngOnInit() {
    const res = await fetch(
      'http://localhost:8080/project/byUser/1', {
        mode: 'cors',
        credentials: 'include'
      }
    );
    const data = await res.json();
    this.myProjects.set(data);
    console.log(data);
  }

  myProjects = signal<Project[]>([
    // {
    //   id: 1,
    //   title: 'Bennos Project',
    //   owner: 'Benno'
    // },
    // {
    //   id: 2,
    //   title: 'Tobis Project',
    //   owner: 'Tobi'
    // },
    // {
    //   id: 3,
    //   title: 'Test Projekt',
    //   owner: 'User'
    // }
  ]);
}

