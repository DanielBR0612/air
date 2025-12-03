import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common'; 
import { ButtonModule } from 'primeng/button'; 

@Component({
    selector: 'app-item', 
    templateUrl: './item.html',
    standalone: true,
    imports: [CardModule, CommonModule, ButtonModule] 
})
export class Item { 
  @Input() titulo: string = '';
  @Input() descricao: string = '';
  @Input() index: number = -1; 

  @Output() remover = new EventEmitter<number>(); 
  @Output() editar = new EventEmitter<number>(); 

  removerItem(event: Event) {
    event.preventDefault();  
    event.stopPropagation(); 

    if (this.index > -1) { 
      this.remover.emit(this.index);
    } else {
      console.warn('Index invalido', this.index);
    }
  }
}