import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Sesion } from '../servicios/sesion';
import { mensajeDeError } from '../servicios/errores';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly sesion = inject(Sesion);
  private readonly router = inject(Router);

  protected readonly entrando = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly formulario = this.fb.nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required]],
  });

  protected entrar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.error.set('Escribe tu correo y tu contraseña');
      return;
    }
    const { correo, contrasena } = this.formulario.getRawValue();
    this.entrando.set(true);
    this.error.set(null);

    this.sesion.login(correo, contrasena).subscribe({
      next: (usuario) => {
        if (usuario.rol !== 'admin') {
          // Una cuenta de miembro no entra al panel: se cierra la sesión que acaba de abrirse.
          this.sesion.salir();
          this.error.set('Esta cuenta no tiene permiso para entrar al panel de administración.');
          this.entrando.set(false);
          return;
        }
        this.router.navigateByUrl('/clases');
      },
      error: (e) => {
        this.error.set(mensajeDeError(e));
        this.entrando.set(false);
      },
    });
  }
}