import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalhe.html'
})
export class Detalhe implements OnInit {
  
  private itemService = inject(ItemService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  item: Item | undefined;
  index: number = -1;

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam !== null) {
      this.index = Number(idParam);
      
      this.item = this.itemService.detalhar(this.index);
    }
  }

  excluir() {
    if (this.index > -1) {
       if(confirm('Deseja realmente excluir: ' + this.item?.titulo + '?')) {
          
          this.itemService.remover(this.index);

          this.router.navigate(['/']); 
       }
    }
  }
}