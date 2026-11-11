import { httpResource } from '@angular/common/http';
import { computed, effect, Injectable, signal } from '@angular/core';
import { API_URL } from './config';
import { Categoria, Clase, Sobre } from './modelos/clase';
import { mensajeDeError } from './servicios/errores';

@Injectable({ providedIn: 'root' })
export class Catalogo {
  // GET /clases (público, sin token). La API responde { data, meta }.
  private readonly recurso = httpResource<Sobre<Clase[]>>(() => `${API_URL}/clases`);

  // Misma API pública que antes (clases, visibles...), pero derivada de la petición.
  // La imagen llega como ruta relativa (/img/clase-01.jpg): se le antepone la URL de la API.
  readonly clases = computed<Clase[]>(() =>
    this.recurso.hasValue()
      ? this.recurso.value().data.map((c) => ({ ...c, imagen: `${API_URL}${c.imagen}` }))
      : [],
  );

  readonly cargando = this.recurso.isLoading;
  readonly error = computed(() => {
    const e = this.recurso.error();
    return e ? mensajeDeError(e) : null;
  });

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

  recargar(): void {
    this.recurso.reload();
  }
}