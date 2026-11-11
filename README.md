-Ejercicio 1

1. ¿Qué pieza de React Router corresponde a router-outlet, a routerLink y a routerLinkActive?

- `router-outlet` corresponde a `<Outlet />`: es el lugar de la pantalla donde se pinta la página que coincide con la ruta actual.
- `routerLink` corresponde a `<Link to="...">`: navega a otra ruta sin recargar la página.
- `routerLinkActive` corresponde a `<NavLink>`, que sabe si su ruta es la activa y permite darle un estilo distinto (en mi barra, la clase `barra__enlace--activo`).

2. ¿Por qué la ruta comodín (`**`) va al final y la ruta vacía necesita `pathMatch: 'full'`?

El router recorre la lista de rutas en orden y se queda con la primera que coincide. La comodín coincide con cualquier URL, así que si estuviera antes taparía a todas las demás y nunca se llegaría a ellas. Por eso va al final, como último recurso para las URL que no existen.

La ruta vacía (`''`), con la comparación por defecto (por prefijo), coincide con el comienzo de cualquier URL, porque toda URL empieza con "nada". Sin `pathMatch: 'full'` la redirección a `/clases` se aplicaría siempre. Con `'full'` sólo coincide cuando la URL completa está vacía.

-Ejercicio 2

1. ¿Dónde vive el valor de un campo en un formulario reactivo y en qué se diferencia del `useState` de React?

El valor vive en un objeto `FormControl`, que forma parte de un `FormGroup` creado con `FormBuilder` en la clase del componente. Se lee con `control.value` o `formulario.value`. Ese control guarda además su estado: si es válido, sus errores, si fue tocado (`touched`) o modificado (`dirty`), y emite cambios con `valueChanges`.

En React, `useState` sólo guarda un valor y su función para cambiarlo, y cada cambio vuelve a renderizar el componente. Para un formulario, la validez y el estado de "tocado" hay que programarlos a mano o con una librería. En Angular el control ya trae todo eso, y el valor se mantiene sincronizado con el input sin que yo escriba un `onChange` por campo.

2. ¿Qué regresa un validador propio cuando el valor es válido y cuando no, y cómo se relaciona con `hasError`?

Un validador es una función que recibe el control. Si el valor es válido regresa `null`. Si no lo es, regresa un objeto cuya llave nombra el error, por ejemplo `{ bloquesDeCinco: true }`.

Ese objeto queda en `control.errors`, y la llave es el nombre que se usa en la plantilla: `hasError('bloquesDeCinco')` es `true` sólo cuando el validador regresó ese objeto. Así el mensaje se muestra únicamente cuando falla esa regla (y el campo ya fue tocado).

- Ejercicio 3

1. ¿Qué cambió en el servicio del catálogo y por qué ningún componente se enteró?

En `Catalogo` se quitó el arreglo local de clases y se puso un `httpResource` contra `GET /clases`. La lista `clases` ahora se calcula a partir de la respuesta de la API (con la URL de la API antepuesta a la ruta de cada imagen), y se agregaron los estados `cargando` y `error`.

Los componentes sólo hablan con el servicio a través de su interfaz (`visibles()`, `minutosTotales()`, `seleccionar()`, etc.), que se mantuvo con los mismos nombres. A ellos les da igual si los datos vienen de un arreglo local o de una petición HTTP. Sólo la página `lista-clases` cambió su plantilla, para mostrar los estados de carga y error.

2. ¿Por qué no hizo falta iniciar sesión para leer el catálogo?

Porque `GET /clases` es un endpoint público del backend: no exige token. El inicio de sesión (JWT) se pide en las operaciones que modifican datos (crear, editar y borrar clases), no para consultar el catálogo. Por eso esta práctica todavía no tiene login y aun así puede mostrar las clases.

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
