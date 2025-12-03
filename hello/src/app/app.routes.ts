import { Routes } from '@angular/router';
import { ListaComponent } from './lista/lista'; 
import { Form } from './form/form';
import { Detalhe } from './detalhe/detalhe'; 

export const routes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  { path: 'listar', component: ListaComponent },
  { path: 'novo', component: Form },    
  { path: 'editar/:id', component: Form }, 
  { path: 'detalhe/:id', component: Detalhe } 
];