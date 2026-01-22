import { Component, input, output, EventEmitter } from '@angular/core';
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
  titulo = input<string>('');
  descricao = input<string>('');
}