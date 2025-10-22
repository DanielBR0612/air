import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-item', 
    templateUrl: './item.html',
    standalone: true,
    imports: [CardModule, CommonModule] 
})
export class Item { 
  @Input() titulo: string = '';
  @Input() descricao: string = '';
  @Input() index: number = -1; 

  @Output() remover = new EventEmitter<number>(); 

  removerItem() {
    if (this.index > -1) { 
      console.log('Item component emitting removal for index:', this.index);
      this.remover.emit(this.index);
    } else {
      console.warn('Cannot remove item: index is invalid', this.index);
    }
  }
}

