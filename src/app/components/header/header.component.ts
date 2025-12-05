import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '../../services/translate.service';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  open = false;
  lang = 'es';
  private sub?: import('rxjs').Subscription;

  // simple label map for the menu (interface-level labels)
  labels: Record<string, Record<string, string>> = {
    home: { es: 'INICIO', en: 'HOME' },
    peliculas: { es: 'PELICULAS', en: 'MOVIES' },
    cines: { es: 'CINES', en: 'CINEMAS' },
    login: { es: 'ACCEDER', en: 'LOGIN' }
  };

  constructor(public t: TranslateService, public theme: ThemeService, public auth: AuthService) {}

  ngOnInit() {
    this.lang = this.t.currentLang || 'es';
    this.sub = this.t.language$.subscribe((l) => (this.lang = l));
  }

  ngOnDestroy() { this.sub?.unsubscribe(); }

  toggleMenu() { this.open = !this.open; }

  async logout() { await this.auth.logout(); }

  onLangChange(value: string | Event) {
    let val: string;
    if (typeof value === 'string') {
      val = value;
    } else {
      // handle Event fallback
      const target = (value as Event & { target?: HTMLSelectElement }).target as HTMLSelectElement | undefined;
      val = target?.value ?? this.lang;
    }
    this.t.setLanguage(val);
  }
}
