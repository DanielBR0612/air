import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ItemService } from '../services/item.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card'; 
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api'; 

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ButtonModule, 
    InputTextModule, 
    CardModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './form.html'
})
export class Form implements OnInit { 
  private itemService = inject(ItemService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService)

  titulo: string = '';
  descricao: string = '';
  index: number | null = null;
  modoEdicao = false;

  ngOnInit() {
    const idRota = this.route.snapshot.paramMap.get('id');

    if (idRota !== null) {
      this.index = Number(idRota);
      this.modoEdicao = true;
      
      const item = this.itemService.detalhar(this.index);
      if (item) {
        this.titulo = item.titulo;
        this.descricao = item.descricao;
      }
    }
  }

salvar() {
    let salvouComSucesso = false;

    if (this.modoEdicao && this.index !== null) {
      salvouComSucesso = this.itemService.salvarOuAtualizar(this.titulo, this.descricao, this.index);
    } else {
      salvouComSucesso = this.itemService.salvarOuAtualizar(this.titulo, this.descricao);
    }

    if (salvouComSucesso) {
      this.router.navigate(['/listar']);
    } else {
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Atenção', 
        detail: 'Já existe uma tarefa com este título!' 
      });
    }
}

  cancelar() {
    this.router.navigate(['/listar']);
  }
}