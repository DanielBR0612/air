import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router'; 
import { Titulo } from '../../titulo/titulo';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, Titulo], 
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  private authService = inject(AuthService);
  
  fazerLogout() {
    this.authService.logout()
  }
}