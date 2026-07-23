import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Create } from './create/create';
import { Details } from './details/details';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'create', component: Create },
    { path: 'brawler/:id', component: Details }
];
