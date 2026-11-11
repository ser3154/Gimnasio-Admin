import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Categoria, CATEGORIAS, ClaseNueva } from '../modelos/clase';
import { bloquesDeCinco } from '../validadores';

@Component({
  selector: 'app-formulario-clase',
  imports: [ReactiveFormsModule, RouterLink, JsonPipe],
  templateUrl: './formulario-clase.html',
})
export class FormularioClase {
  private readonly fb = inject(FormBuilder);

  protected readonly categorias = CATEGORIAS;
  protected readonly objetoListo = signal<ClaseNueva | null>(null);

  protected readonly formulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(80)]],
    categoria: ['', [Validators.required]],
    descripcion: ['', [Validators.required, Validators.maxLength(255)]],
    duracionMin: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(10),
      bloquesDeCinco,
    ]),
    imagen: ['', [Validators.required, Validators.maxLength(120), Validators.pattern(/^\/img\/.+/)]],
  });

  protected get c() {
    return this.formulario.controls;
  }

  protected guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched(); // así salen todos los mensajes en rojo
      this.objetoListo.set(null);
      return;
    }
    const v = this.formulario.getRawValue();
    const clase: ClaseNueva = {
      nombre: (v.nombre ?? '').trim(),
      categoria: v.categoria as Categoria,
      descripcion: (v.descripcion ?? '').trim(),
      duracionMin: Number(v.duracionMin),
      imagen: v.imagen ?? '',
    };
    this.objetoListo.set(clase); // todavía no se manda a ninguna API
  }
}