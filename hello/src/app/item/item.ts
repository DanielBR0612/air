import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common'; 
import { ButtonModule } from 'primeng/button'; 
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-item', 
    templateUrl: './item.html',
    standalone: true,

    imports: [CardModule, CommonModule, ButtonModule, CheckboxModule, FormsModule] 
})
export class Item { 
  @Input() titulo: string = '';
  @Input() descricao: string = '';
  @Input() index: number = -1; 
  @Input() lido: boolean = false;

  @Output() remover = new EventEmitter<number>(); 

  @Output() editar = new EventEmitter<number>();
  @Output() lidoChange = new EventEmitter<{index: number, lido: boolean}>();

  removerItem() {
    if (this.index > -1) { 
      this.remover.emit(this.index);
    } else {
      console.warn('Index invalido', this.index);
    }
  }


  solicitarEdicao() {
    this.editar.emit(this.index);
  }
}

