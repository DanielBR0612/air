import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hello');
}

// @Component({
//     selector: 'button-demo',
//     templateUrl: './button-demo.html',
//     imports: [ButtonModule]
// })
// export class ButtonDemo {}
