import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core'; // 1. Importe PLATFORM_ID
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common'; // 2. Importe isPlatformBrowser
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  
  private apiUrl = 'http://localhost:5001/auth/login'; 
  estaLogado = signal(this.verificarTokenInicial());

  constructor() {
  }

  private verificarTokenInicial(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false; 
  }

  login(nome: string, senha: string) {
    return this.http.post<{ token: string }>(this.apiUrl, { nome, senha })
      .pipe(
        tap((resposta) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', resposta.token);
          }
          this.estaLogado.set(true);
        })
      );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.estaLogado.set(false);
    this.router.navigate(['/login']);
  }

  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
}