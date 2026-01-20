import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  loginForm = this.fb.group({
    usuario: ['', [Validators.required]],
    senha: ['', [Validators.required, Validators.minLength(3)]]
  });

  loading = false;

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const { usuario, senha } = this.loginForm.value;

    this.authService.login(usuario!, senha!).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']); 
      },
      error: (err) => {
        this.loading = false;
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