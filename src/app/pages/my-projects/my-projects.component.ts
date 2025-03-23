import { Component, OnInit, signal } from '@angular/core';
import { GenericButtonComponent } from '../../components/generic-button/generic-button.component';
import { Project } from '../../models/projects.model';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'my-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, GenericButtonComponent],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.css'
})
export class MyProjectsComponent implements OnInit {
  myProjects = signal<Project[]>([]);

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    try {
      const user: any = await this.http.get('http://localhost:8080/user/me', { headers }).toPromise();
      const userId = user.id;

      const projects: any = await this.http.get(`http://localhost:8080/project/byUser/${userId}`, { headers }).toPromise();
      this.myProjects.set(projects);
    } catch (error) {
      console.error('Fehler beim Laden der Projekte:', error);
    }
  }

  confirmDelete(projectId: number, projectName: string) {
    const confirmed = window.confirm(`Möchtest du das Projekt "${projectName}" wirklich löschen?`);
    if (confirmed) {
      this.deleteProject(projectId);
    }
  }

  async deleteProject(projectId: number) {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    try {
      const res = await fetch(`http://localhost:8080/project/${projectId}`, {
        method: 'DELETE',
        headers
      });

      if (res.ok) {
        const updatedProjects = this.myProjects().filter(p => p.id !== projectId);
        this.myProjects.set(updatedProjects);
        console.log(`Projekt ${projectId} wurde gelöscht`);
      } else {
        console.error('Löschen fehlgeschlagen:', res.status);
      }
    } catch (error) {
      console.error('Fehler beim Löschen:', error);
    }
  }

}
