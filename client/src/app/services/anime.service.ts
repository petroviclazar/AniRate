import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Anime, AnimeModel } from '../store/types/anime.module';
import { environment } from '../environments/environment';

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  constructor(private http: HttpClient, private router: Router) {}

  // Server vraca samo jednu "stranicu" kataloga odjednom (skip/take na bazi),
  // umesto da se ceo katalog uvek povlaci i drzi u NgRx store-u.
  getAllAnime(
    page: number = 1,
    limit: number = 20
  ): Observable<PaginatedResponse<Anime>> {
    return this.http.get<PaginatedResponse<Anime>>(
      `${environment.apiUrl}/anime/getAnime`,
      {
        withCredentials: true,
        params: { page: page.toString(), limit: limit.toString() },
      }
    );
  }
  getAnimeByStudio(id: number): Observable<Anime> {
    return this.http.get<Anime>(
      `${environment.apiUrl}/anime/getAnimeById/${id}`,
      { withCredentials: true }
    );
  }
  addAnimeToUser(userId: number, animeId: number): Observable<Anime> {
    return this.http.post<Anime>(
      `${environment.apiUrl}/user/addAnimeToUser/${userId}/${animeId}`,
      { withCredentials: true }
    );
  }
  getAnimeForStudio(id: number): Observable<Anime[]> {
    return this.http.get<Anime[]>(
      `${environment.apiUrl}/anime/getAnimeByStudio/${id}`,
      {
        withCredentials: true,
      }
    );
  }
  postAnime(anime: AnimeModel, id: number): Observable<AnimeModel> {
    const animeData = {
      name: anime.name,
      title: anime.title,
      episodeCount: anime.episodeCount,
      description: anime.description,
    };

    return this.http.post<AnimeModel>(
      `${environment.apiUrl}/anime/addAnime/${id}`,
      animeData,
      {
        withCredentials: true,
      }
    );
  }
  getAnimeForUser(id: number): Observable<Anime[]> {
    return this.http.get<Anime[]>(`${environment.apiUrl}/user/user/${id}`, {
      withCredentials: true,
    });
  }
}