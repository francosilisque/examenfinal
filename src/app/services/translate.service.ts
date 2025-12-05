import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private http = inject(HttpClient);
  private lang$ = new BehaviorSubject<string>('es');
  private data$ = new BehaviorSubject<Record<string, string>>({});
  // expose an observable for components to react to language changes
  public language$ = this.lang$.asObservable();

  constructor() {
    const saved = (localStorage.getItem('lang') as string) || 'es';
    // load the saved language immediately
    this.loadLanguage(saved);
  }

  loadLanguage(lang: string) {
    const tryPath = (path: string) => this.http.get<Record<string, string>>(path);

    // Try relative path first (works when app served from a subpath), fallback to absolute
    tryPath(`assets/i18n/${lang}.json`).subscribe({
      next: (d) => {
        this.data$.next(d || {});
        this.lang$.next(lang);
        localStorage.setItem('lang', lang);
      },
      error: () => {
        tryPath(`/assets/i18n/${lang}.json`).subscribe({
          next: (d) => {
            this.data$.next(d || {});
            this.lang$.next(lang);
            localStorage.setItem('lang', lang);
          },
          error: () => {
            // fallback to empty map but still set lang
            this.data$.next({});
            this.lang$.next(lang);
            localStorage.setItem('lang', lang);
          }
        });
      }
    });
  }

  setLanguage(lang: string) {
    this.loadLanguage(lang);
  }

  get currentLang() {
    return this.lang$.value;
  }

  translate(key: string) {
    return this.data$.value[key] ?? key;
  }
}
