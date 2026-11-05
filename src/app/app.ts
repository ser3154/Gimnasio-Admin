import { Component, computed, inject } from '@angular/core';
import { Catalogo } from './catalogo';
import { FiltroCategoria } from './filtro-categoria/filtro-categoria';
import { TarjetaClase } from './tarjeta-clase/tarjeta-clase';

@Component({
  selector: 'app-root',
  imports: [TarjetaClase, FiltroCategoria],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly catalogo = inject(Catalogo);

  protected readonly total = computed(() => this.catalogo.visibles().length);
  protected readonly largas = computed(
    () => this.catalogo.visibles().filter((c) => c.duracionMin >= 60).length,
  );
}