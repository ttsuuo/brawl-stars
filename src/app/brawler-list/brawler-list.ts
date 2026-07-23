import { Component, inject } from '@angular/core';
import { BrawlerInfo } from '../brawler';
import { BrawlerService } from '../brawler-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brawler-list',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './brawler-list.html',
  styleUrl: './brawler-list.css',
})
export class BrawlerList {
  brawlerService: BrawlerService = inject(BrawlerService);
  brawlers: BrawlerInfo[] = [];
  filteredBrawlerList: BrawlerInfo[] = [];

  constructor() {
    this.brawlers = this.brawlerService.getBrawlers();
    this.filteredBrawlerList = this.brawlers;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredBrawlerList = this.brawlers;
      return;
    }

    this.filteredBrawlerList = this.brawlers.filter((brawler) => {
      return brawler?.name.toLowerCase().includes(text.toLowerCase())
    });
  }

  getColor(rarity: string): string {
    switch (rarity) {
      case 'Common': return '#4FC3F7';
      case 'Rare': return '#4CAF50';
      case 'Super Rare': return '#2196F3';
      case 'Epic': return '#9C27B0';
      case 'Mythic': return '#eb1212';
      case 'Legendary': return '#FFEB3B';
      case 'Ultra Legendary': return '#2e0051';
      default: return 'black';
    }
  }
}
