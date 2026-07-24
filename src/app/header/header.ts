import { Component, inject } from '@angular/core';
import { Navigation } from '../navigation/navigation';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    Navigation,
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  goToHome(): string {
    return '/';
  }
}
