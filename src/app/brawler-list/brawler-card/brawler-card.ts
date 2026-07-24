import { Component, EventEmitter, Input, Output, inject} from '@angular/core';
import { BrawlerService } from '../../brawler-service';
import { BrawlerInfo } from '../../brawler';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brawler-card',
  imports: [CommonModule],
  templateUrl: './brawler-card.html',
  styleUrl: './brawler-card.css',
})
export class BrawlerCard {
  @Input() brawler?: BrawlerInfo;
  brawlerService: BrawlerService = inject(BrawlerService);

  @Output() showDetails = new EventEmitter<BrawlerInfo>();

  onButtonClick() {
    this.showDetails.emit(this.brawler);
  }
}
