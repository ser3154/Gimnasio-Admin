import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Catalogo } from '../catalogo';
import { Categoria, CATEGORIAS, ClaseNueva } from '../modelos/clase';
import { ConCambios } from '../guardias/salidas.guard';
import { ClasesApi } from '../servicios/clases-api';
import { mensajeDeError } from '../servicios/errores';
import { bloquesDeCinco } from '../validadores';

@Component({
  selector: 'app-formulario-clase',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-clase.html',
})
export class FormularioClase implements OnInit, ConCambios {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ClasesApi);
  private readonly catalogo = inject(Catalogo);
  private readonly router = inject(Router);

  // Llega de la URL /clases/:id/editar (withComponentInputBinding). En /clases/nueva es undefined.
  readonly id = input<string>();
  protected readonly editando = computed(() => this.id() !== undefined);

  protected readonly categorias = CATEGORIAS;
  protected readonly guardando = signal(false);
  protected readonly errorServidor = signal<string | null>(null);
  private guardado = false;

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

  ngOnInit(): void {
    const id = this.id();
    if (id === undefined) return;
    this.api.obtener(Number(id)).subscribe({
      next: (clase) =>
        // patchValue llena el formulario y lo deja "pristine" (sin cambios).
        this.formulario.patchValue({
          nombre: clase.nombre,
          categoria: clase.categoria,
          descripcion: clase.descripcion,
          duracionMin: clase.duracionMin,
          imagen: clase.imagen,
        }),
      error: (e) => this.errorServidor.set(mensajeDeError(e)),
    });
  }

  protected guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
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

    // Misma función para las dos rutas: si hay id es PATCH, si no es POST.
    const peticion = this.editando()
      ? this.api.actualizar(Number(this.id()), clase)
      : this.api.crear(clase);

    this.guardando.set(true);
    this.errorServidor.set(null);

    peticion.subscribe({
      next: () => {
        this.guardado = true; // para que la guarda de salida no pregunte
        this.catalogo.recargar();
        this.router.navigateByUrl('/clases');
      },
      error: (e) => {
        this.errorServidor.set(mensajeDeError(e)); // mensajes del servidor (400)
        this.guardando.set(false);
      },
    });
  }

  /** Lo usa la guarda canDeactivate. */
  puedeSalir(): boolean {
    if (this.guardado || !this.formulario.dirty) return true;
    return confirm('Tienes cambios sin guardar. ¿Quieres salir de todos modos?');
  }
}