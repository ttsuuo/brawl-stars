import { Service, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError, switchMap } from 'rxjs';
import { ApiResponse } from './api-response';
import { CharacterInfo } from './character';

@Service()
export class CharacterService {
    private characterUrl = `${environment.apiUrl}/api/character`;

    private http = inject(HttpClient);

    getLimits(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.characterUrl)
    }
 
    getFilteredCharactersByName(name: string = '', page: number = 1): Observable<ApiResponse> {
        let url = `${this.characterUrl}?page=${page}`;

        if (name && name.trim() !== '') {
            url += `&name=${name.toLowerCase()}`;
        }

        return this.http.get<ApiResponse>(url).pipe(
            tap(response => console.log('Сырой ответ сервера:', response)),

            catchError(err => {
                console.error('Не удалось загрузить пользователей:', err);

                return throwError(() => err);
            })
        )
    }

    getSomeone(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.characterUrl)
    }

    getCharacterById(id: string | number): Observable<CharacterInfo> {
        return this.http.get<CharacterInfo>(`${this.characterUrl}/${id}`)
    }

    getRandomPageData(page: number = 1): Observable<CharacterInfo> {
        return this.http.get<ApiResponse>(`${this.characterUrl}?page=${page}`).pipe(
            switchMap(response => {
                const items = response.results;
                const randomId = Math.floor(Math.random() * items.length);
                const id = items[randomId].id;

                return this.http.get<CharacterInfo>(`${this.characterUrl}/${id}`)
            })
        )
    }
}
