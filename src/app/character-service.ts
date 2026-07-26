import { Service, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, of, map} from 'rxjs';
import { ApiResponse } from './api-response';
import { CharacterInfo } from './character';

@Service()
export class CharacterService {
    private characterUrl = `${environment.apiUrl}/api/character`;

    private http = inject(HttpClient);

    getCharacters(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.characterUrl).pipe(
            tap(response => console.log('Сырой ответ сервера:', response)),

            catchError(err => {
                console.error('Не удалось загрузить пользователей:', err);

                const defaultResponse: ApiResponse = {
                    results: [],
                    info: { count: 0, pages: 0, next: null, prev: null }
                }

                return of(defaultResponse);
            })
        )
    }

    getCharacterById(id: string | number): Observable<CharacterInfo> {
        return this.http.get<CharacterInfo>(`${this.characterUrl}/${id}`)
    }
}
