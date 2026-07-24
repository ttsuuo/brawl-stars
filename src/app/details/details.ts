import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrawlerService } from '../brawler-service';
import { BrawlerInfo } from '../brawler';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  private route = inject(ActivatedRoute);
  brawlerId = -1;

  constructor() {
    this.brawlerId = Number(this.route.snapshot.params['id'])
  }
}
