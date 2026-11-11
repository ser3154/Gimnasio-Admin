import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Catalogo } from '../catalogo';
import { FiltroCategoria } from '../filtro-categoria/filtro-categoria';
import { TarjetaClase } from '../tarjeta-clase/tarjeta-clase';

@Component({
  selector: 'app-lista-clases',
  imports: [TarjetaClase, FiltroCategoria, RouterLink],
  templateUrl: './lista-clases.html',
})
export class ListaClases {
  protected readonly catalogo = inject(Catalogo);

  protected readonly total = computed(() => this.catalogo.visibles().length);
  protected readonly largas = computed(
    () => this.catalogo.visibles().filter((c) => c.duracionMin >= 60).length,
  );
}