import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CharacterInfo } from '../character';
import { CharacterService } from '../character-service';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../api-response';
import { CharacterCard } from './character-card/character-card';

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
  cdr = inject(ChangeDetectorRef);

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
}
