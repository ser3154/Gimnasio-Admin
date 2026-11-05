import { computed, effect, Injectable, signal } from '@angular/core';
import { CLASES_LOCALES } from './datos/clases-locales';
import { Categoria, Clase } from './modelos/clase';

@Injectable({ providedIn: 'root' })
export class Catalogo {
  readonly clases = signal<Clase[]>(CLASES_LOCALES);
  readonly categoriaElegida = signal<Categoria | null>(null); 
  readonly claseSeleccionada = signal<Clase | null>(null);

  readonly visibles = computed(() => {
    const cat = this.categoriaElegida();
    return cat ? this.clases().filter((c) => c.categoria === cat) : this.clases();
  });

  readonly minutosTotales = computed(() =>
    this.visibles().reduce((suma, c) => suma + c.duracionMin, 0),
  );

  constructor() {
    effect(() => {
      const sel = this.claseSeleccionada();
      if (sel && !this.visibles().some((c) => c.id === sel.id)) {
        this.claseSeleccionada.set(null);
      }
    });
  }

  elegirCategoria(cat: Categoria | null): void {
    this.categoriaElegida.set(cat);
  }

  seleccionar(clase: Clase): void {
    this.claseSeleccionada.set(clase);
  }

  vaciar(): void {
    this.clases.set([]);
  }

  restaurar(): void {
    this.clases.set(CLASES_LOCALES);
  }
}