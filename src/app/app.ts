import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { BrawlerList } from './brawler-list/brawler-list';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    BrawlerList
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('brawl-stars');
}
