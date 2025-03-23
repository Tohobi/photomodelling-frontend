import { Component, OnInit, signal } from '@angular/core';
import { GenericButtonComponent } from '../../components/generic-button/generic-button.component';
import { Project } from '../../models/projects.model';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { StrategyService } from '../../services/strategy.service'; // ggf. Pfad anpassen

@Component({
  selector: 'app-other-projects',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    GenericButtonComponent
  ],
  templateUrl: './other-projects.component.html',
  styleUrl: './other-projects.component.css'
})
export class OtherProjectsComponent implements OnInit {
  myProjects = signal<Project[]>([]);
  currentUserId: number | null = null;
  averageScores: { [projectId: number]: number } = {};

  // Bewertungsmodal-Variablen
  ratingValue: number | null = null;
  ratingComment: string = '';
  selectedProjectId: number | null = null;

  constructor(private http: HttpClient, private strategyService: StrategyService) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    try {
      // Eigener User
      const user: any = await this.http.get('http://localhost:8080/user/me', { headers }).toPromise();
      this.currentUserId = user.id;

      // Alle Projekte
      const projects = await this.http.get<any[]>('http://localhost:8080/project', { headers }).toPromise() ?? [];

      // Nur fremde Projekte anzeigen
      const filtered = projects.filter((p: any) => p.user?.id !== this.currentUserId);
      this.myProjects.set(filtered);

      // Durchschnittsbewertungen laden
      for (const project of filtered) {
        this.loadAverageScore(project.id);
      }
    } catch (err) {
      console.error('Fehler beim Laden:', err);
    }

    this.strategyService.strategyChanged$.subscribe(strategy => {
      console.log('Neue Strategie empfangen:', strategy);
      this.reloadProjects();
    });
  }

  // Modal öffnen
  openRatingDialog(projectId: number) {
    this.selectedProjectId = projectId;
    this.ratingValue = null;
    this.ratingComment = '';

    const modalEl = document.getElementById('rateProjectModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  // Bewertung absenden
  async submitRating() {
    if (!this.selectedProjectId || !this.ratingValue || !this.currentUserId) {
      alert('Bitte Bewertung, Projekt und Benutzer korrekt angeben.');
      return;
    }

    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const body = {
      score: this.ratingValue,
      comment: this.ratingComment,
      project: { id: this.selectedProjectId },
      user: { id: this.currentUserId }
    };

    try {
      const res = await fetch('http://localhost:8080/rating/create', {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });

      if (res.ok) {
        //alert('Danke für deine Bewertung!');
        const modalEl = document.getElementById('rateProjectModal');
        bootstrap.Modal.getInstance(modalEl!)?.hide();
        this.reloadProjects();
      } else {
        const errorText = await res.text();
        console.error('Fehler beim Bewerten:', res.status, errorText);
      }
    } catch (err) {
      console.error('Technischer Fehler beim Absenden der Bewertung:', err);
    }
  }

  // Durchschnittsbewertung laden
  loadAverageScore(projectId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<number>(`http://localhost:8080/rating/project/${projectId}/average`, { headers })
      .subscribe({
        next: (score: number) => {
          this.averageScores[projectId] = Math.round(score * 10) / 10; // z. B. 4.3
        },
        error: (err: any) => {
          console.error(`Fehler beim Laden des Durchschnitts für Projekt ${projectId}:`, err);
        }
      });
  }

  reloadProjects() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any[]>('http://localhost:8080/project', { headers }).subscribe({
      next: (projects) => {
        const filtered = projects.filter(p => p.user?.id !== this.currentUserId);
        this.myProjects.set(filtered);

        // Neue Scores laden
        for (const project of filtered) {
          this.loadAverageScore(project.id);
        }
      },
      error: (err) => {
        console.error('Fehler beim Neuladen der Projekte:', err);
      }
    });
  }
}
