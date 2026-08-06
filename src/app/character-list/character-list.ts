import { Component, inject, OnInit, ChangeDetectorRef, ViewContainerRef, ViewChild, ComponentRef } from '@angular/core';
import { CharacterInfo } from '../character';
import { CharacterService } from '../character-service';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../api-response';
import { CharacterCard } from './character-card/character-card';
import { Router } from '@angular/router';
import { CharacterModal } from './character-modal/character-modal';

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

  currentPage = 1;
  searchQuery: string = '';
  isLoading = false;

  @ViewChild('modalContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  private modalRef?: ComponentRef<CharacterModal>;

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters() {
    if (this.isLoading) return;

    this.isLoading = true;

    this.characterService
    .getFilteredCharactersByName(this.searchQuery, this.currentPage)
    .subscribe({
      next: (data) => {
        this.characters = data.results;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Ошибка загрузки', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  filterResults(text: string) {
    this.searchQuery = text;
    this.currentPage = 1;
    this.loadCharacters();
  }
  
  nextPage() {
    this.currentPage++;
    this.loadCharacters();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters();
    }
  }

  handleButtonClick(id: number, type: string): void {
    if (type === 'details') {
      this.router.navigate(['character', id])
    }
    if (type === 'modal') {
      this.container.clear();

      this.modalRef = this.container.createComponent(CharacterModal);

      this.modalRef.setInput('id', id);

      this.modalRef.instance.close.subscribe(() => this.closeModal());
    } else {
      console.error('Error');
    }
  }

  closeModal() {
    this.container.clear();
  }
}
