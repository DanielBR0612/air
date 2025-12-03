import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Item } from '../item/item'; 

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, Item], 
  templateUrl: './lista.html'
})
export class ListaComponent {
  private itemService = inject(ItemService);
  private router = inject(Router);

  listaDeCards = this.itemService.listaDeCards;

  irParaEdicao(id: number) {
    this.router.navigate(['/editar', id]);
  }
}