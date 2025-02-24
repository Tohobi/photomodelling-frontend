import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project';
import { ProjectService } from '../service/project.service';
import { CommonModule } from '@angular/common';
import {NgFor, NgForOf} from "@angular/common";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  projects: Project[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getPictures();
  }

  getPictures(): void {
    this.projectService.getProjects()
      .subscribe(pictures => this.projects = pictures);
  }


  delete(picture: Project): void {
    this.projects = this.projects.filter(pic => pic !== picture);
    this.projectService.deleteProject(picture.id).subscribe();
  }
}
