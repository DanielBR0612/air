import { Component, signal, WritableSignal, inject } from '@angular/core'; 
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast'; 
import { Titulo } from './titulo/titulo'; 
import { Form, FormPayload } from './form/form'; 
import { Item } from './item/item'; 
import { CommonModule } from '@angular/common'; 

import { ItemService } from './services/item.service';

interface CardItem {
  titulo: string;
  descricao: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Titulo, 
    ButtonModule, 
    PanelModule, 
    MenubarModule, 
    Form, 
    Item, 
    ToastModule,
    CommonModule,
  ], 
  templateUrl: './app.html', 
  styleUrl: './app.css', 
})
export class App {
  private itemService = inject(ItemService);

  listaDeCards = this.itemService.listaDeCards;

  protected readonly title = signal('Daniel');
  protected qtd = signal(0);

  abrirDialogoEdicao(index: number, formComponent: Form) {

      const item = this.itemService.detalhar(index);
      
      if (item) {
          formComponent.abrirParaEditar({ ...item, index }); 
      }
  }

  salvarOuAtualizarItem(payload: FormPayload) {
      this.itemService.salvarOuAtualizar(
          payload.titulo, 
          payload.descricao, 
          payload.index
      );
  }

  removerCard(index: number) {
    this.itemService.remover(index);
  }

  incrementar() {
    this.qtd.update(q => q + 1);
  }
}