import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/tareas`;

  listar(): Observable<Tarea[]> {
    console.log('Llamando al endpoint:', this.endpoint);
    return this.http.get<Tarea[]>(this.endpoint);
  }

  crear(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.endpoint, tarea);
  }
}