 Ejercicio 1
 - ¿Qué diferencia hay entre un signal y un computed, y cuál se parece a useState y cuál a use Memo?
   Un signal guarda un valor que se escribe con set() o update(). Un computed no se escribe: es
   de solo lectura y su valor se deriva de otros signals. Se recalcula solo cuando cambia alguna
   de sus dependencias y guarda en caché el resultado. Signal() se parece a useState, y
   computed() se parece a useMemo, pero sin arreglo de dependencias, porque Angular las detecta
   solo.

 Ejercicio 2
 - ¿Qué pasa si el filtro hace new Catalogo() en lugar de inject(Catalogo)?
   Se crea una instancia nueva y aislada del servicio, con sus propios signals. El filtro
   cambia la categoría de su copia, pero el tablero lee la instancia que inyecta Angular
   (Singleton, providedIn: "root"), así que nunca se entera y el filtro no hace nada visible.
   Además se pierde la inyección de dependencias y el servicio no se puede reemplazar en
   pruebas.

- NG8109: aparece al leer un signal en el template sin invocarlo ({{ total }} en lugar de
  {{ total () }})


# GimnasioAdmin

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
