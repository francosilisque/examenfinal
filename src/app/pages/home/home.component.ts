import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '../../services/translate.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  lang = 'es';
  labels: Record<string, Record<string, string>> = {
    title: { es: 'Bienvenido a Proyecto Cine', en: 'Welcome to Proyecto Cine' },
    subtitle: { es: 'Gestión de películas y cines con Firebase.', en: 'Manage movies and cinemas with Firebase.' }
  };
  constructor(private translate: TranslateService) {
    this.lang = this.translate.currentLang || 'es';
    this.translate.language$.subscribe((l) => (this.lang = l));
  }
}

