import { Injectable, signal, WritableSignal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5001/itens'; 

  private cardsSignal: WritableSignal<Item[]> = signal([]);
  readonly listaDeCards = this.cardsSignal.asReadonly();

  constructor() {
    this.listar();
  }

  listar() {
    this.http.get<Item[]>(this.apiUrl).subscribe({
      next: (itens) => {
        this.cardsSignal.set(itens);
      },
      error: (erro) => console.error('Erro ao buscar itens', erro)
    });
  }

  salvarOuAtualizar(titulo: string, descricao: string, index?: number) {
    if (typeof index === 'number' && index >= 0) {
      const itemExistente = this.cardsSignal()[index];
      
      if (itemExistente && itemExistente.id) {
        const payload = { titulo, descricao };

        this.http.patch<Item>(`${this.apiUrl}/${itemExistente.id}`, payload).subscribe({
          next: (itemAtualizado) => {
            this.cardsSignal.update(cards => {
              const novaLista = [...cards];
              novaLista[index] = itemAtualizado;
              return novaLista;
            });
          },
          error: (err) => console.error('Erro ao atualizar', err)
        });
      }
    } else {
      const payload = { titulo, descricao };
      
      this.http.post<Item>(this.apiUrl, payload).subscribe({
        next: (novoItem) => {
          this.cardsSignal.update(cards => [...cards, novoItem]);
        },
        error: (err) => console.error('Erro ao salvar', err)
      });
    }
  }

  remover(indexRemover: number) {
    const item = this.cardsSignal()[indexRemover];

    if (item && item.id) {
      this.http.delete(`${this.apiUrl}/${item.id}`).subscribe({
        next: () => {
          this.cardsSignal.update(cards => 
            cards.filter((_, index) => index !== indexRemover)
          );
        },
        error: (err) => console.error('Erro ao remover', err)
      });
    }
  }

  detalhar(index: number): Item | undefined {
    const cards = this.cardsSignal();
    return cards[index];
  }
}