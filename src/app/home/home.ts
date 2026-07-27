import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from '../character-service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private router = inject(Router);
  private characterService = inject(CharacterService);
  maxId = 0;
  maxPages = 0;
  isLoaded = false;

  ngOnInit(): void {
    this.characterService.getLimits().subscribe({
      next: (response) => {
        this.maxId = response.info.count;
        this.maxPages = response.info.pages;
        this.isLoaded = true;
      },
      error: (err) => console.error(err)
    })
  }

  getRandomPage(): number {
    return Math.floor(Math.random() * this.maxPages) + 1;
  }

  goToRandomCharacter() {
    if (!this.isLoaded) return;

    this.characterService.getRandomPageData(this.getRandomPage()).subscribe({
      next: (finalData) => {
        this.router.navigate([`/character`, finalData.id])
      },
      error: (err) => console.error(err)
    })
  }
}
