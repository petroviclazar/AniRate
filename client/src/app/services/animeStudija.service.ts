import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { AnimeStudioModel } from '../store/types/animestudio.module';

@Injectable({
  providedIn: 'root',
})
export class AnimeStudijaService {
  constructor(private http: HttpClient, private router: Router) {}

  getAllAnimeStudija(): Observable<AnimeStudioModel[]> {
    return this.http.get<AnimeStudioModel[]>(
      'http://localhost:3000/animestudio/getAnimeStudio',
      { withCredentials: true }
    );
  }

  getAnimeStudioId(id: number): Observable<AnimeStudioModel> {
    return this.http.get<AnimeStudioModel>(
      `http://localhost:3000/animestudio/getAnimeStudio/${id}`,
      { withCredentials: true }
    );
  }
  postAnimeStudio(animeStudio: AnimeStudioModel): Observable<AnimeStudioModel> {
    const animeStudioData = {
      name: animeStudio.name,
      slika: animeStudio.slika,
    };
    return this.http.post<AnimeStudioModel>(
      `http://localhost:3000/animestudio/addAnimeStudio`,
      animeStudioData,
      { withCredentials: true }
    );
  }
}
