import { Component, inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { BrawlerService } from '../../brawler-service';

@Component({
  selector: 'app-brawl-modal',
  imports: [],
  templateUrl: './brawl-modal.html',
  styleUrl: './brawl-modal.css',
})
export class BrawlModal {
  dialogRef = inject(DialogRef);
  brawlerService = inject(BrawlerService);
  brawler = inject(DIALOG_DATA);

  close() {
    this.dialogRef.close();
  }
}
