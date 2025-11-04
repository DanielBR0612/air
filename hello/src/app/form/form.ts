import { Component, Output, EventEmitter, Input } from '@angular/core'; 
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

export interface FormPayload {
  titulo: string;
  descricao: string;
  index?: number; 
  lido: boolean;
}

interface ItemParaEditar {
    titulo: string;
    descricao: string;
    index: number;
}

@Component({
    selector: 'app-form',
    templateUrl: './form.html',
    standalone: true,
    imports: [DialogModule, ButtonModule, InputTextModule, FormsModule, CheckboxModule]
})
export class Form {
    visible: boolean = false;
    titulo: string = ''; 
    descricao: string = ''; 
    lido: boolean = false;

    private indiceEditando: number | null = null; 

    @Output() itemSalvo = new EventEmitter<FormPayload>();

    get tituloDialogo(): string {
        return this.indiceEditando === null ? 'Adicionar Novo Item' : 'Editar Item';
    }

    abrirParaAdicionar() {
      this.indiceEditando = null; 
      this.titulo = ''; 
      this.descricao = ''; 
      this.visible = true;
    }

    abrirParaEditar(item: ItemParaEditar) {
        this.indiceEditando = item.index;
        this.titulo = item.titulo; 
        this.descricao = item.descricao;
        this.visible = true;
    }

    salvar() {
        if (this.titulo && this.titulo.trim() !== '' && this.descricao && this.descricao.trim() !== '') {
            const payload: FormPayload = { 
                titulo: this.titulo.trim(), 
                descricao: this.descricao.trim(), 
                lido: this.lido
            };
            if (this.indiceEditando !== null) { 
              payload.index = this.indiceEditando; 
          }
            this.itemSalvo.emit(payload);
            this.visible = false; 
        } else {
          console.warn("Não podem ter campos vazios");
        }
    }  

    cancelar() {
      this.visible = false;
    }
}

