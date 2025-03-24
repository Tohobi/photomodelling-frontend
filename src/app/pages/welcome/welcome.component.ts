/*
import { Component } from '@angular/core';
import {GenericButtonComponent} from '../../components/generic-button/generic-button.component';

@Component({
  selector: 'app-welcome',
  imports: [
    GenericButtonComponent
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
*/

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  registerUsername: string = '';
  registerPassword: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post<any>('http://localhost:8080/user/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/my-projects']);
      },
      error: (error) => {
        this.errorMessage = 'Login fehlgeschlagen. Bitte überprüfe deine Zugangsdaten.';
      }
    });
  }

  openRegisterModal() {
    const modalEl = document.getElementById('registerModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
  async register() {
    if (!this.registerUsername || !this.registerPassword) {
      alert('Bitte Benutzername und Passwort eingeben.');
      return;
    }

    const body = {
      username: this.registerUsername,
      password: this.registerPassword,
      role: 'USER'
    };

    try {
      const res = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        alert('Registrierung erfolgreich! Du kannst dich jetzt einloggen.');

        // Modal schließen
        const modalEl = document.getElementById('registerModal');
        bootstrap.Modal.getInstance(modalEl!)?.hide();

        // Eingaben zurücksetzen
        this.registerUsername = '';
        this.registerPassword = '';
      } else {
        const errorText = await res.text();
        console.error('Registrierung fehlgeschlagen:', errorText);
        alert('Registrierung fehlgeschlagen. Benutzername evtl. schon vergeben?');
      }
    } catch (err) {
      console.error('Technischer Fehler bei Registrierung:', err);
      alert('Technischer Fehler bei der Registrierung.');
    }
  }

}
