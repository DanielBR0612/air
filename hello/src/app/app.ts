import { Component, signal, WritableSignal } from '@angular/core'; 
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast'; 
import { Titulo } from './titulo/titulo'; 
import { Form, FormPayload } from './form/form'; 
import { Item } from './item/item'; 
import { CommonModule } from '@angular/common'; 

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
  protected readonly title = signal('Daniel');
  protected qtd = signal(0);
  items: any[] = []; 

  listaDeCards: WritableSignal<CardItem[]> = signal([]); 

  abrirDialogoEdicao(item: CardItem, index: number, formComponent: Form) {
      formComponent.abrirParaEditar({ ...item, index }); 
  }

  salvarOuAtualizarItem(payload: FormPayload) {
      
      if (typeof payload.index === 'number' && payload.index >= 0) {
          this.listaDeCards.update(cardsAtuais => {
              return cardsAtuais.map((card, idx) => {
                  if (idx === payload.index) {
                      return { titulo: payload.titulo, descricao: payload.descricao };
                  }
                  return card; 
              });
          });
      } else {
          this.listaDeCards.update(cardsAtuais => {
              if (!cardsAtuais.some(card => card.titulo === payload.titulo)) {
                return [...cardsAtuais, { titulo: payload.titulo, descricao: payload.descricao }]; 
              } else {
                return cardsAtuais; 
              }
          });
      }
  }

  removerCard(indexRemover: number) {
    this.listaDeCards.update(cardsAtuais => 
        cardsAtuais.filter((card, index) => index !== indexRemover) 
    );
  }

  incrementar() {
    this.qtd.update(q => q + 1);
  }
}

