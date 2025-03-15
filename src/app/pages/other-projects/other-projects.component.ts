import {Component, OnInit, signal} from '@angular/core';
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

export class OtherProjectsComponent implements OnInit{
  async ngOnInit() {
    const res = await fetch(
      'http://localhost:8080/project', {
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
