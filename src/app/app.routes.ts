import { Routes } from '@angular/router';
import { Characters } from './characters/characters';
import { Home } from './home/home';
import { CharacterDetails } from './character-details/character-details';
import { Stopwatch } from './stopwatch/stopwatch';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'characters', component: Characters },
    { path: 'character/:id', component: CharacterDetails },
    { path: 'stopwatch', component: Stopwatch }
];
