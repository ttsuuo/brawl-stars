import { Component, inject } from '@angular/core';
import { BrawlerInfo } from '../brawler';
import { BrawlerService } from '../brawler-service';
import { CommonModule } from '@angular/common';
import { BrawlerCard } from './brawler-card/brawler-card';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { BrawlModal } from './brawl-modal/brawl-modal';

@Component({
  selector: 'app-brawler-list',
  imports: [
    CommonModule,
    BrawlerCard,
    DialogModule
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

  private dialog = inject(Dialog);

  openModal(selectedBrawler: BrawlerInfo) {
    this.dialog.open(BrawlModal, {
      data: selectedBrawler
    })
  }
}
