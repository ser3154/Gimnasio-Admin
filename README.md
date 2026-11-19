## Ejercicio 1

- ¿Qué diferencia hay entre un signal y un Observable?
Un signal siempre tiene un valor actual que se puede leer de forma síncrona (`s()`), y Angular sabe qué plantillas lo usan para actualizarlas. Un Observable es un flujo de valores en el tiempo: no tiene "valor actual" hasta que alguien se suscribe y emite, puede ser asíncrono, terminar o fallar, y tiene operadores para transformarlo (debounce, switchMap, etc.). Los signals son ideales para estado de la interfaz; los Observables, para eventos y flujos asíncronos. `toSignal` conecta los dos.

## Ejercicio 2

- ¿Qué problema evita `switchMap` y qué pasaría con `mergeMap`?
`switchMap` cancela la petición anterior cuando llega un término nuevo, y así solo cuenta la respuesta de la última búsqueda (en la pestaña Red las anteriores salen como "canceladas"). Con `mergeMap` todas las peticiones quedarían vivas a la vez y sus respuestas llegarían en cualquier orden: una búsqueda vieja y lenta podría responder después de la nueva y pisar la lista, mostrando resultados que no corresponden a lo escrito (condición de carrera).

- ¿Qué pasa si se quita `catchError` y la API se apaga?
El error llega al `switchMap` y el Observable del tubo termina con error: deja de existir. Aunque se encienda la API otra vez y el usuario siga escribiendo, ya no se hace ninguna búsqueda y la pantalla se queda congelada (además `toSignal` lanza el error al leer el signal). Con `catchError` dentro del `switchMap` el error se convierte en un estado y el tubo sigue vivo.


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
