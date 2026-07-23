import { Component, inject } from '@angular/core';
import { BrawlerInfo } from '../brawler';
import { BrawlerService } from '../brawler-service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class Create {

  private brawlerService = inject(BrawlerService);

  brawlers = this.brawlerService.getBrawlers();
  rarities = this.brawlerService.getRarities();
  classes = this.brawlerService.getClasses();

  isSubmitted = false;

  brawlerForm  = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    rarity: new FormControl('', [Validators.required]),
    class: new FormControl('', [Validators.required]),
    // image: new FormControl(null, [Validators.required])
  })

  addValueToArray() {
    this.isSubmitted = true;
    if (this.brawlerForm.invalid) {
      this.brawlerForm.markAllAsTouched();
      return;
    } else if (this.brawlerForm.valid) {
      const formValue = this.brawlerForm.value;

      const newBrawler: BrawlerInfo = {
        id: Date.now(),
        name: formValue.name ?? '',
        rarity: formValue.rarity ?? '',
        class: formValue.class ?? '',
        image: 'images/brawlers/default-brawler.png'
      }

      this.brawlers.push(newBrawler);
      this.brawlerForm.reset();
      this.isSubmitted = false;
    }
  }

  get name() {
    return this.brawlerForm.get('name');
  }

  get rarity() {
    return this.brawlerForm.get('rarity');
  }

  get class() {
    return this.brawlerForm.get('class')
  }
}
