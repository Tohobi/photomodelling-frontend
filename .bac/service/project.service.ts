
import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Project } from '../model/project';
import { BrowserModule } from '@angular/platform-browser';

// @NgModule({
//     imports: [
//     BrowserModule,
//     HttpClientModule,
//     ],
// })
@Injectable({ providedIn: 'root' })
export class ProjectService {

  private projectUrl = 'http://localhost:8080/api/project';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }


  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl + '/findAll')
      .pipe(
        tap(_ => this.log('fetched projects')),
        catchError(this.handleError<Project[]>('getProjects', []))
      );
  }


  getProject(id: number): Observable<Project> {
    const url = `${this.projectUrl}/find/${id}`;
    return this.http.get<Project>(url).pipe(
      tap(_ => this.log(`fetched project id=${id}`)),
      catchError(this.handleError<Project>(`getProject id=${id}`))
    );
  }

  deleteProject(id: number): Observable<Project> {
    const url = `${this.projectUrl}/${id}`;
    return this.http.delete<Project>(url).pipe(
      tap(_ => this.log(`deleted project id=${id}`)),
      catchError(this.handleError<Project>(`deleteProject id=${id}`))
    );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    // this.messageService.add(`ProjectService: ${message}`);
    console.log(`ProjectService: ${message}`);
  }
}
