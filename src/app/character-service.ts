import { Service, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class CharacterService {
    private characterUrl = `${environment.apiUrl}/api/character`;

    private http = inject(HttpClient);
}
