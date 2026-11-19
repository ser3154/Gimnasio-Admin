import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, catchError, map, of, startWith, switchMap } from 'rxjs';
import { API_URL } from './config';
import { Categoria, Clase } from './modelos/clase';
import { ClasesApi } from './servicios/clases-api';
import { mensajeDeError } from './servicios/errores';

interface Estado {
  cargando: boolean;
  clases: Clase[];
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class Catalogo {
  private readonly api = inject(ClasesApi);

  // El "tubo": cada valor nuevo de termino$ dispara una búsqueda.
  private readonly termino$ = new BehaviorSubject<string>('');

  private readonly estado = toSignal(
    this.termino$.pipe(
      switchMap((q) =>
        this.api.buscar(q).pipe(
          map(
            (clases): Estado => ({
              cargando: false,
              error: null,
              // La imagen llega como ruta relativa: se le antepone la URL de la API.
              clases: clases.map((c) => ({ ...c, imagen: `${API_URL}${c.imagen}` })),
            }),
          ),
          // Sin catchError, un error MATA el tubo y ya no se puede volver a buscar.
          catchError((e) => of<Estado>({ cargando: false, clases: [], error: mensajeDeError(e) })),
          startWith<Estado>({ cargando: true, clases: [], error: null }),
        ),
      ),
    ),
    { initialValue: { cargando: true, clases: [], error: null } as Estado },
  );

  readonly termino = toSignal(this.termino$, { initialValue: '' });

  readonly clases = computed(() => this.estado().clases);
  readonly cargando = computed(() => this.estado().cargando);
  readonly error = computed(() => this.estado().error);

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
    // Si la clase seleccionada ya no está en la lista (se borró, se filtró), se quita.
    effect(() => {
      const sel = this.claseSeleccionada();
      if (sel && !this.visibles().some((c) => c.id === sel.id)) {
        this.claseSeleccionada.set(null);
      }
    });
  }

  buscar(q: string): void {
    this.termino$.next(q.trim());
  }

  elegirCategoria(cat: Categoria | null): void {
    this.categoriaElegida.set(cat);
  }

  seleccionar(clase: Clase): void {
    this.claseSeleccionada.set(clase);
  }

  /** Repite la búsqueda actual (después de crear, editar o borrar). */
  recargar(): void {
    this.termino$.next(this.termino$.value);
  }
}