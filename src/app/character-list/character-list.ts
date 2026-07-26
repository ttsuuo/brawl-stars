import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CharacterInfo } from '../character';
import { CharacterService } from '../character-service';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../api-response';
import { CharacterCard } from './character-card/character-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-list',
  imports: [
    CommonModule,
    CharacterCard
  ],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css',
})
export class CharacterList {
  characters:  CharacterInfo[] = [];
  characterService = inject(CharacterService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  data: any;

  ngOnInit(): void {
    this.characterService.getCharacters().subscribe({
      next: (data: ApiResponse) => {
        this.characters = data.results;
        this.cdr.detectChanges();
        console.log(this.characters);
      },
      error: (err) => console.error('Ошибка загрузки', err)
    })
  }

  handleButtonClick(id: number): void {
    if (id) {
      this.router.navigate(['character', id]);
    } else {
      console.error('Error');
    }
  }
}
