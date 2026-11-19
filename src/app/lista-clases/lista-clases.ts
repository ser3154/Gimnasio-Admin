import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Catalogo } from '../catalogo';
import { FiltroCategoria } from '../filtro-categoria/filtro-categoria';
import { Clase } from '../modelos/clase';
import { ClasesApi } from '../servicios/clases-api';
import { mensajeDeError } from '../servicios/errores';
import { TarjetaClase } from '../tarjeta-clase/tarjeta-clase';

@Component({
  selector: 'app-lista-clases',
  imports: [TarjetaClase, FiltroCategoria, RouterLink, ReactiveFormsModule],
  templateUrl: './lista-clases.html',
})
export class ListaClases {
  protected readonly catalogo = inject(Catalogo);
  private readonly api = inject(ClasesApi);

  protected readonly errorAccion = signal<string | null>(null);

  protected readonly total = computed(() => this.catalogo.visibles().length);
  protected readonly largas = computed(
    () => this.catalogo.visibles().filter((c) => c.duracionMin >= 60).length,
  );

  protected readonly busqueda = new FormControl('', { nonNullable: true });

  constructor() {
    // Se suscribe en el constructor (contexto de inyección): takeUntilDestroyed() funciona sin argumentos.
    this.busqueda.valueChanges
      .pipe(
        debounceTime(300), // espera a que deje de teclear
        distinctUntilChanged(), // no repite la misma búsqueda
        takeUntilDestroyed(), // se desuscribe al destruir el componente
      )
      .subscribe((q) => this.catalogo.buscar(q));
  }

  protected eliminar(clase: Clase): void {
    if (!confirm(`¿Eliminar la clase «${clase.nombre}»? Esta acción no se puede deshacer.`)) return;
    this.errorAccion.set(null);
    this.api.eliminar(clase.id).subscribe({
      next: () => this.catalogo.recargar(),
      error: (e) => this.errorAccion.set(mensajeDeError(e)),
    });
  }
}