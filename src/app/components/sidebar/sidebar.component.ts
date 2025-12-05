import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar">
      <nav>
        <a routerLink="/">Home</a>
        <a routerLink="/peliculas">Películas</a>
        <a routerLink="/cines">Cines</a>
      </nav>
    </aside>
  `,
  styles: [`.sidebar{width:220px;padding:1rem;background:var(--accent-1);min-height:100vh} .sidebar a{display:block;margin:0.5rem 0;color:var(--text);text-decoration:none}`]
})
export class SidebarComponent {}
