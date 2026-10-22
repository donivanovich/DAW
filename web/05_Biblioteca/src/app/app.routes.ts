
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'inicio',
    loadComponent: () =>
      import('./pages/inicio/inicio').then(m => m.Inicio)
  },
  {
    path: 'libros',
    loadComponent: () =>
      import('./pages/libros/libros').then(m => m.Libros)
  },
  {
    path: 'autores',
    loadComponent: () =>
      import('./pages/autores/autores').then(m => m.Autores)
  },
  {
    path: '404',
    loadComponent: () =>
      import('./pages/no-encontrado/no-encontrado')
        .then(m => m.NoEncontrado)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inicio'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
