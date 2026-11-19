import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { API_URL } from '../config';
import { Usuario } from '../modelos/clase';

const RUTA_LOGIN = `${API_URL}/auth/login`;
const CLAVE = 'gimnasio.sesion';

interface Guardado {
  token: string;
  usuario: Usuario;
}

/** Lee el payload de un JWT (por si la API no manda el usuario aparte). */
function decodificar(token: string): Partial<Usuario> {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const p = JSON.parse(decodeURIComponent(escape(atob(base64))));
    return { correo: p.correo ?? p.email, nombre: p.nombre, rol: p.rol ?? p.role };
  } catch {
    return {};
  }
}

@Injectable({ providedIn: 'root' })
export class Sesion {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly guardado = signal<Guardado | null>(this.leer());

  readonly token = computed(() => this.guardado()?.token ?? null);
  readonly usuario = computed(() => this.guardado()?.usuario ?? null);
  readonly esAdmin = computed(() => this.usuario()?.rol === 'admin');

  login(correo: string, contrasena: string): Observable<Usuario> {
    return this.http
      .post<any>(RUTA_LOGIN, { correo, password: contrasena }) // ← el cambio
      .pipe(
        map((r) => {
          const d = r?.data ?? r;
          const token: string = d.access_token ?? d.token;
          const u = d.usuario ?? d.user ?? {};
          const payload = decodificar(token);
          const usuario: Usuario = {
            correo: u.correo ?? payload.correo ?? correo,
            nombre: u.nombre ?? payload.nombre ?? correo,
            rol: u.rol ?? payload.rol ?? 'miembro',
          };
          return { token, usuario } as Guardado;
        }),
        tap((g) => {
          this.guardado.set(g);
          localStorage.setItem(CLAVE, JSON.stringify(g));
        }),
        map((g) => g.usuario),
      );
  }

  /** Borra la sesión y NAVEGA al login: el guardia sólo corre cuando hay navegación. */
  salir(): void {
    this.guardado.set(null);
    localStorage.removeItem(CLAVE);
    this.router.navigateByUrl('/login');
  }

  private leer(): Guardado | null {
    try {
      return JSON.parse(localStorage.getItem(CLAVE) ?? 'null');
    } catch {
      return null;
    }
  }
}