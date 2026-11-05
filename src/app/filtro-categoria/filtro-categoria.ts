import { Component, inject } from '@angular/core';
import { Catalogo } from '../catalogo';
import { CATEGORIAS } from '../modelos/clase';

@Component({
  selector: 'app-filtro-categoria',
  imports: [],
  templateUrl: './filtro-categoria.html',
})
export class FiltroCategoria {
  protected readonly catalogo = inject(Catalogo);
  protected readonly categorias = CATEGORIAS;
}