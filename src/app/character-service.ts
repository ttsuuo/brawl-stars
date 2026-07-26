import { Service, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterInfo } from './character';
import { ApiResponse } from './api-response';

@Service()
export class CharacterService {
    private characterUrl = `${environment.apiUrl}/api/character`;

    private http = inject(HttpClient);

    getCharacters(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.characterUrl)
    }
}
