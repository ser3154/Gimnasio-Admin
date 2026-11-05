import { Component, input, output } from '@angular/core';
import { Clase } from '../modelos/clase';

@Component({
  selector: 'app-tarjeta-clase',
  imports: [],
  templateUrl: './tarjeta-clase.html',
  styleUrl: './tarjeta-clase.css',
})
export class TarjetaClase {
  readonly clase = input.required<Clase>();
  readonly activa = input(false);
  readonly elegida = output<Clase>();

  protected elegir(): void {
    this.elegida.emit(this.clase());
  }
}