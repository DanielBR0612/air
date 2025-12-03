import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ItemService } from '../services/item.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card'; 

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ButtonModule, 
    InputTextModule, 
    CardModule 
  ],
  templateUrl: './form.html'
})
export class Form implements OnInit { 
  private itemService = inject(ItemService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

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
    if (this.modoEdicao && this.index !== null) {
      this.itemService.salvarOuAtualizar(this.titulo, this.descricao, this.index);
    } else {
      this.itemService.salvarOuAtualizar(this.titulo, this.descricao);
    }
    this.router.navigate(['/listar']);
  }

  cancelar() {
    this.router.navigate(['/listar']);
  }
}