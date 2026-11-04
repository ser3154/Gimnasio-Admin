import { Component, computed, signal } from '@angular/core';
import { CLASES_LOCALES } from './datos/clases-locales';
import { Clase } from './modelos/clase';
import { TarjetaClase } from './tarjeta-clase/tarjeta-clase';

@Component({
  selector: 'app-root',
  imports: [TarjetaClase],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly clases = signal<Clase[]>(CLASES_LOCALES);

  protected readonly total = computed(() => this.clases().length);
  protected readonly minutosSemana = computed(() =>
    this.clases().reduce((suma, c) => suma + c.duracionMin, 0),
  );
  protected readonly largas = computed(
    () => this.clases().filter((c) => c.duracionMin >= 60).length,
  );

  protected vaciar(): void {
    this.clases.set([]);
  }

  protected restaurar(): void {
    this.clases.set(CLASES_LOCALES);
  }
}