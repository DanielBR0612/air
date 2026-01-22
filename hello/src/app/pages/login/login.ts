import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

import { form, FormField, required, minLength } from '@angular/forms/signals';

interface LoginData {
  nome: string;
  senha: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormField], // Importante: FormField
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private router = inject(Router);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  loading = signal(false);

  loginModel = signal<LoginData>({
    nome: '',
    senha: '',
  });

  loginForm = form(this.loginModel, (regras) => {
    required(regras.nome, { message: 'Usuário é obrigatório' });
    
    required(regras.senha, { message: 'Senha é obrigatória' });
    minLength(regras.senha, 3, { message: 'Mínimo de 3 caracteres' });
  });

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.loginForm().invalid()) {
      return;
    }

    this.loading.set(true);

    const credentials = this.loginModel();

    this.authService.login(credentials.nome, credentials.senha).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Usuário ou senha incorretos'
        });
      }
    });
  }
}