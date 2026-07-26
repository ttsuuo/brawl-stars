import { Component , inject, OnInit, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../character-service';
import { CharacterInfo } from '../character';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-details',
  imports: [CommonModule],
  templateUrl: './character-details.html',
  styleUrl: './character-details.css',
})
export class CharacterDetails implements OnInit{
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef)
  characterService = inject(CharacterService);
  character: CharacterInfo | null = null;


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.characterService.getCharacterById(id).subscribe(data => {
        this.character = data;
         this.cdr.detectChanges();
      })
    }
  }
}
