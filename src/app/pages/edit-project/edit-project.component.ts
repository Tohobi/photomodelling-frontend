import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css'
})
export class EditProjectComponent implements OnInit{

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  project: any;
  selectedFiles: File[] = [];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any>(`http://localhost:8080/project/byId/${id}`, { headers }).subscribe({
      next: (response) => {
        console.log('Projekt-Response:', response);
        this.project = Array.isArray(response) ? response[0] : response;
      },
      error: (err) => {
        console.error('Fehler beim Laden des Projekts:', err);
      }
    });
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  async uploadPhotos() {
    if (!this.project || this.selectedFiles.length === 0) return;

    // Konvertiere Bilder zu deinem Photo-Objekt
    const photoPayloads = await Promise.all(
      this.selectedFiles.map(async (file) => {
        const base64 = await this.convertToBase64(file);
        return {
          filename: file.name,
          data: base64
        };
      })
    );

    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    try {
      const response = await fetch(`http://localhost:8080/project/${this.project.id}/addPhotos`, {
        method: 'POST',
        headers,
        body: JSON.stringify(photoPayloads)
      });

      if (response.ok) {
        alert('Fotos erfolgreich hochgeladen!');
        this.selectedFiles = [];
      } else {
        console.error('Fehler beim Hochladen:', response.status);
      }
    } catch (err) {
      console.error('Technischer Fehler:', err);
    }
  }

  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

}
