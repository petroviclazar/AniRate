import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Anime, AnimeModel } from '../store/types/anime.module';
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  constructor(private http: HttpClient, private router: Router) {}

  getAllAnime(): Observable<Anime[]> {
    return this.http.get<Anime[]>('http://localhost:3000/anime/getAnime', {
      withCredentials: true,
    });
  }
  getAnimeByStudio(id: number): Observable<Anime> {
    return this.http.get<Anime>(
      `http://localhost:3000/anime/getAnimeById/${id}`,
      { withCredentials: true }
    );
  }
  addAnimeToUser(userId: number, animeId: number): Observable<Anime> {
    return this.http.post<Anime>(
      `http://localhost:3000/user/addAnimeToUser/${userId}/${animeId}`,
      { withCredentials: true }
    );
  }
  getAnimeForStudio(id: number): Observable<Anime[]> {
    return this.http.get<Anime[]>(
      `http://localhost:3000/anime/getAnimeByStudio/${id}`,
      {
        withCredentials: true,
      }
    );
  }
  postAnime(anime: AnimeModel, id: number): Observable<Anime[]> {
    const animeData = {
      name: anime.name,
      title: anime.title,
      episodeCount: anime.episodeCount,
      description: anime.description,
    };

    return this.http.post<Anime[]>(
      `http://localhost:3000/anime/addAnime/${id}`,
      animeData,
      {
        withCredentials: true,
      }
    );
  }
  getAnimeForUser(id: number): Observable<Anime[]> {
    return this.http.get<Anime[]>(` http://localhost:3000/user/user/${id}`, {
      withCredentials: true,
    });
  }
  // updateAnime(anime: Anime): Observable<Anime> {
  //   return this.http.put<Anime>(
  //     ` http://localhost:3000/anime/updateAnime`,
  //     anime,
  //     {
  //       withCredentials: true,
  //     }
  //   );
  // }
}
