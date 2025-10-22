import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { Titulo } from './titulo/titulo'; 
import { Form } from './form/form'; 
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

  items: any[] = []; 

  listaDeCards: WritableSignal<CardItem[]> = signal([]); 

  adicionarNovoItem(novoItem: { titulo: string, descricao: string }) { 
    console.log('AppComponent received title:', novoItem.titulo);
    console.log('AppComponent received description:', novoItem.descricao);
    this.listaDeCards.update(cardsAtuais => {

          return [...cardsAtuais, novoItem]; 
    });
    console.log('AppComponent list updated (Signal):', this.listaDeCards());
  }

  removerCard(indexRemover: number) {
    console.log('Removendo card no índice:', indexRemover);
    
    this.listaDeCards.update(cardsAtuais => 

        cardsAtuais.filter((card, index) => index !== indexRemover) 
    );
    
    console.log('Lista após remoção (Signal):', this.listaDeCards());
  }
}

