import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_URL } from '../config';
import { Clase, ClaseConHorarios, ClaseNueva, Sobre } from '../modelos/clase';

@Injectable({ providedIn: 'root' })
export class ClasesApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${API_URL}/clases`;

  /** GET /clases?q=texto  (Práctica 23) */
  buscar(q: string): Observable<Clase[]> {
    const params = q ? new HttpParams().set('q', q) : undefined;
    return this.http.get<Sobre<Clase[]>>(this.url, { params }).pipe(map((r) => r.data));
  }

  obtener(id: number): Observable<ClaseConHorarios> {
    return this.http.get<Sobre<ClaseConHorarios>>(`${this.url}/${id}`).pipe(map((r) => r.data));
  }

  crear(clase: ClaseNueva): Observable<Clase> {
    return this.http.post<Sobre<Clase>>(this.url, clase).pipe(map((r) => r.data));
  }

  actualizar(id: number, clase: ClaseNueva): Observable<Clase> {
    return this.http.patch<Sobre<Clase>>(`${this.url}/${id}`, clase).pipe(map((r) => r.data));
  }

  eliminar(id: number): Observable<unknown> {
    return this.http.delete(`${this.url}/${id}`);
  }
}