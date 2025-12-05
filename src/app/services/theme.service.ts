import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private key = 'theme-mode';

  constructor() {
    const mode = localStorage.getItem(this.key) || 'light';
    this.apply(mode);
  }

  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    this.apply(next);
    localStorage.setItem(this.key, next);
  }

  apply(mode: 'light' | 'dark' | string) {
    document.documentElement.setAttribute('data-theme', mode);
  }
}
