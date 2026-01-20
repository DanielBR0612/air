import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth.guard';
import { ListaComponent } from './lista/lista'; 
import { Form } from './form/form';
import { Detalhe } from './detalhe/detalhe';

export const routes: Routes = [
  { 
    path: 'login', 
    component: Login
  },

  { 
    path: '', 
    component: HomeComponent,
    canActivate: [authGuard], 
    children: [
      { path: '', redirectTo: 'listar', pathMatch: 'full' },
      
      { path: 'listar', component: ListaComponent },
      { path: 'novo', component: Form },    
      { path: 'editar/:id', component: Form }, 
      { path: 'detalhe/:id', component: Detalhe }
    ]
  },

  { path: '**', redirectTo: '' }
];