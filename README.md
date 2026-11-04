Ejercicio 1

- ¿Qué archivo de Angular hace el papel de main.tsx, App.tsx y vite.config.ts?
  - main.tsx: src/main.ts: arranca la aplicación con "bootstrapApplication (App, appConfig)"
  - App.tsx: src/app/app.ts: es el componente raíz.
  - vite.config.ts: angular.json: configura el build, el servidor de desarrollo, los assets y
    los estilos globales.

 Ejercicio 2
 
- ¿Por qué clase() lleva paréntesis?
  Porque "input.required()" devuelve un signal, y un signal es una función. Se llama con
  paréntesis para leer su valor actual, y así Angular sabe que el template depende de él y lo
  actualiza cuando cambia.

- ¿Para qué sirve "track"?
  Le dice a Angular cómo identificar cada elemento de la lista. Con eso, cuando la lista cambia,
  reutiliza los nodos del DOM que ya existen y solo crea, mueve o elimina los necesarios, en vez
   de repintar todo.

  Errores provocados
  - NG8001: `'app-tarjeta-clase' is not a known element`, por quitar `TarjetaClase` de `imports`. Ver `evidencias/`.
  - NG5002: error de sintaxis del template, por dejar el bloque `@for` sin cerrar. Ver `evidencias/`.



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
