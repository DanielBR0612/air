import { Component } from '@angular/core'; 
import { RouterOutlet, RouterLink } from '@angular/router'; 
import { MenubarModule } from 'primeng/menubar'; 
import { ToastModule } from 'primeng/toast';     
import { Titulo } from './titulo/titulo'; 
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Titulo, 
    MenubarModule, 
    ToastModule,
    RouterOutlet, 
    RouterLink,   
  ], 
  providers: [MessageService],
  templateUrl: './app.html', 
  styleUrl: './app.css', 
})
export class App {

}