import { Component, Input } from '@angular/core';
import { CharacterInfo } from '../../character';

@Component({
  selector: 'app-character-card',
  imports: [],
  templateUrl: './character-card.html',
  styleUrl: './character-card.css',
})
export class CharacterCard {
  @Input() character!: CharacterInfo;
}

