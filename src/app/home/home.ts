import { Component } from '@angular/core';
import { BrawlerList } from '../brawler-list/brawler-list';

@Component({
  selector: 'app-home',
  imports: [BrawlerList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
