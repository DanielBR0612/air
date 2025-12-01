import { Injectable, signal, WritableSignal } from '@angular/core';

export interface CardItem {
  titulo: string;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private cardsSignal: WritableSignal<CardItem[]> = signal([]);

  readonly listaDeCards = this.cardsSignal.asReadonly();

  constructor() { }

  salvarOuAtualizar(titulo: string, descricao: string, index?: number) {
    if (typeof index === 'number' && index >= 0) {
      this.cardsSignal.update(cards => {
        return cards.map((card, idx) => {
          if (idx === index) {
            return { titulo, descricao };
          }
          return card;
        });
      });
    } else {
      this.cardsSignal.update(cards => {
        const jaExiste = cards.some(card => card.titulo === titulo);
        if (!jaExiste) {
          return [...cards, { titulo, descricao }];
        }
        return cards;
      });
    }
  }

  remover(indexRemover: number) {
    this.cardsSignal.update(cards => 
      cards.filter((_, index) => index !== indexRemover)
    );
  }

  detalhar(index: number): CardItem | undefined {
    const cards = this.cardsSignal();
    return cards[index];
  }
}