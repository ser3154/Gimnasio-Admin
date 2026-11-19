import { Routes } from '@angular/router';
import { guardiaAdmin } from './guardias/admin.guard';
import { salirSinGuardar } from './guardias/salidas.guard';
import { Horarios } from './horarios/horarios';
import { ListaClases } from './lista-clases/lista-clases';
import { Login } from './login/login';
import { Miembros } from './miembros/miembros';
import { Panel } from './panel/panel';

const cargarFormulario = () =>
  import('./formulario-clase/formulario-clase').then((m) => m.FormularioClase);

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    component: Panel,
    canActivate: [guardiaAdmin],
    children: [
      { path: '', redirectTo: 'clases', pathMatch: 'full' },
      { path: 'clases', component: ListaClases },
      { path: 'clases/nueva', loadComponent: cargarFormulario, canDeactivate: [salirSinGuardar] },
      { path: 'clases/:id/editar', loadComponent: cargarFormulario, canDeactivate: [salirSinGuardar] },
      { path: 'horarios', component: Horarios },
      { path: 'miembros', component: Miembros },
    ],
  },
  { path: '**', redirectTo: 'clases' },
];