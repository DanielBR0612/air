import { Component, Output, EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-form',
    templateUrl: './form.html',
    standalone: true,
    imports: [DialogModule, ButtonModule, InputTextModule, FormsModule]
})
export class Form {
    visible: boolean = false;
    titulo: string = '';
    descricao: string ='';
    index: number = 0;

    @Output() itemSalvo = new EventEmitter<{ titulo: string; descricao: string; index: number}>();

    showDialog() {
      this.titulo = ''; 
      this.descricao = ''; 
      this.visible = true;
    }

    salvarItem() {
        if (this.titulo && this.titulo.trim() !== '' && this.descricao && this.descricao.trim() !== '') {
          console.log('Tentando salvar. Título atual:', this.titulo, 'Descrição atual:', this.descricao);
            this.itemSalvo.emit({ 
                titulo: this.titulo.trim(), 
                descricao: this.descricao.trim(), 
                index: this.index 
            });
            this.visible = false; 
        } else {
          console.warn("Não podem ter campos vazios");
        }
    }  
  }