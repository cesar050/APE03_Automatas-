import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav>
      <span class="brand">APE03 — Autómatas Finitos</span>
      <div class="nav-section">
        <span class="section-label">AFND</span>
        <a routerLink="/afnd/iot"     routerLinkActive="active">IoT</a>
        <a routerLink="/afnd/slack"   routerLinkActive="active">Slack</a>
        <a routerLink="/afnd/genetic" routerLinkActive="active">Genético</a>
      </div>
      <div class="nav-section">
        <span class="section-label">AFD</span>
        <a routerLink="/afd/banking"    routerLinkActive="active">Bancario</a>
        <a routerLink="/afd/lock"       routerLinkActive="active">Cerradura</a>
        <a routerLink="/afd/scientific" routerLinkActive="active">Científica</a>
      </div>
    </nav>
    <main><router-outlet/></main>
  `
})
export class AppComponent {}