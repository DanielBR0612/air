import { Injectable, signal, WritableSignal } from '@angular/core';
import { Item } from '../models/item.model'; 

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private cardsSignal: WritableSignal<Item[]> = signal([]);
  readonly listaDeCards = this.cardsSignal.asReadonly();

  constructor() { 
  }

  salvarOuAtualizar(titulo: string, descricao: string, index?: number): boolean {
    if (typeof index === 'number' && index >= 0) {
      this.cardsSignal.update(cards => {
        return cards.map((card, idx) => {
          if (idx === index) {
            return { ...card, titulo, descricao }; 
          }
          return card;
        });
      });
      return true; 
    } 
    else {
      const cardsAtuais = this.cardsSignal();
      
      const jaExiste = cardsAtuais.some(card => card.titulo === titulo);

      if (jaExiste) {
        return false; 
      }
      this.cardsSignal.update(cards => 
        [...cards, { titulo, descricao, lido: false }]
      );
      
      return true; 
    }
  }

  remover(indexRemover: number) {
    this.cardsSignal.update(cards => 
      cards.filter((_, index) => index !== indexRemover)
    );
  }

  detalhar(index: number): Item | undefined {
    const cards = this.cardsSignal();
    return cards[index];
  }
}