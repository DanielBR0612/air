import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ButtonModule,PanelModule],
  template: `<main>
    <p-panel header = "ola, {{ title() }}">
      <p class="font-bold text-6xl">Valor do contado: {{ qtd() }}</p>
      <p-button label="Incrementar 1" (onClick)="incrementar()"></p-button>
    </p-panel>
  </main>`,
    
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Daniel');

  protected qtd = signal(0);

  incrementar() {
    this.qtd.set(this.qtd() + 1);
  }
}

