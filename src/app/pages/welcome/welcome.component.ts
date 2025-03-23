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
}
