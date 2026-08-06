import { Component, input, output, inject, OnInit } from '@angular/core';
import { CharacterService } from '../../character-service';
import { CharacterInfo } from '../../character';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-character-modal',
  imports: [CommonModule],
  templateUrl: './character-modal.html',
  styleUrl: './character-modal.css',
})
export class CharacterModal implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  characterService = inject(CharacterService);
  character: CharacterInfo | null = null;

  statusColors: Record<string, string> = {
    'Alive': '#00ff9986',
    'Dead': '#ff000086',
    'unknown': '#fff05086'
  };

  close = output<void>();
  id = input<number>();

  ngOnInit() {
    if (this.id() !== null) {
      this.characterService.getCharacterById(this.id()).subscribe(data => {
        this.character = data;
        this.cdr.detectChanges();
      })
    }
  }
}
