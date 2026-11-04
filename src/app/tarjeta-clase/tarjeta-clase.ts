import { Component, input } from '@angular/core';
import { Clase } from '../modelos/clase';

@Component({
  selector: 'app-tarjeta-clase',
  imports: [],
  templateUrl: './tarjeta-clase.html',
  styleUrl: './tarjeta-clase.css',
})
export class TarjetaClase {
  readonly clase = input.required<Clase>();
}