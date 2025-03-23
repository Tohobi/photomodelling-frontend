import { Component, OnInit, signal } from '@angular/core';
import { GenericButtonComponent } from '../../components/generic-button/generic-button.component';
import { Project } from '../../models/projects.model';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import * as bootstrap from 'bootstrap';


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

  showCreateDialog = false;
  newProjectName = '';
  newProjectDescription = '';
  userId: number | null = null;

  /*openCreateDialog() {
    this.showCreateDialog = true;
  }*/

  closeCreateDialog() {
    this.showCreateDialog = false;
    this.newProjectName = '';
    this.newProjectDescription = '';
  }

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    try {
      const user: any = await this.http.get('http://localhost:8080/user/me', { headers }).toPromise();
      this.userId = user.id;
      console.log('Eingeloggter User:', this.userId);

      const projects: any = await this.http.get(`http://localhost:8080/project/byUser/${this.userId}`, { headers }).toPromise();
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

  async openCreateDialog() {
    const modalElement = document.getElementById('createProjectModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  async createProject() {
    console.log('Button wurde geklickt');

    if (!this.userId || !this.newProjectName) {
      console.warn('Fehlende Eingaben oder userId!');
      return;
    }

    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const body = {
      name: this.newProjectName,
      description: this.newProjectDescription,
      user: {
        id: this.userId
      }
    };

    console.log('Sende Projekt an Backend:', body);

    try {
      const res = await fetch('http://localhost:8080/project/create', {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });

      if (res.ok) {
        const created = await res.json();
        console.log('Projekt erstellt:', created);
        this.myProjects.set([...this.myProjects(), created]);

        // Modal schließen
        const modalElement = document.getElementById('createProjectModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement!);
        modalInstance?.hide();

        // Felder leeren
        this.newProjectName = '';
        this.newProjectDescription = '';
      } else {
        const errorText = await res.text();
        console.error(`Fehler beim Erstellen (Status ${res.status}):`, errorText);
      }
    } catch (err) {
      console.error('Technischer Fehler beim Erstellen:', err);
    }
  }

}
