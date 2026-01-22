import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { form, FormField, required } from '@angular/forms/signals'; 

import { ItemService } from '../services/item.service';

interface ItemData {
  titulo: string;
  descricao: string;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule, 
    ButtonModule, 
    InputTextModule,
    CardModule,
    FormField 
  ],
  templateUrl: './form.html',
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class Form implements OnInit { 
  private itemService = inject(ItemService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  index: number | null = null;
  modoEdicao = signal(false);
  loading = signal(false);

  itemModel = signal<ItemData>({
    titulo: '',
    descricao: ''
  });

  itemForm = form(this.itemModel, (regras) => {
    required(regras.titulo, { message: 'O título é obrigatório.' });
    required(regras.descricao, { message: 'A descrição é obrigatória.' });
  });

  ngOnInit() {
    const idRota = this.route.snapshot.paramMap.get('id');

    if (idRota !== null) {
      this.index = Number(idRota);
      this.modoEdicao.set(true);
      
      const item = this.itemService.detalhar(this.index);
      if (item) {
        this.itemModel.set({
          titulo: item.titulo,
          descricao: item.descricao
        });
      }
    }
  }

  salvar(event: Event) {
    event.preventDefault();

    if (this.itemForm().invalid()) {
      return;
    }

    this.loading.set(true);

    const dados = this.itemModel(); 

    if (this.modoEdicao() && this.index !== null) {
      this.itemService.salvarOuAtualizar(dados.titulo, dados.descricao, this.index);
    } else {
      this.itemService.salvarOuAtualizar(dados.titulo, dados.descricao);
    }

    this.loading.set(false);
    this.router.navigate(['/listar']);
  }

  cancelar() {
    this.router.navigate(['/listar']);
  }
}