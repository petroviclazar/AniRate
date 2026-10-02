import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import {
  AnimeRating,
  AnimeRatingModel,
} from '../store/types/animerating.module';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AnimeRatingService {
  constructor(private http: HttpClient, private router: Router) {}

  postAnimeRating(
    animeRating: AnimeRatingModel,
    id: number,
    id1: number
  ): Observable<AnimeRating[]> {
    const animeRatingData = {
      rating: animeRating.animeRating,
    };

    return this.http.post<AnimeRating[]>(
      `${environment.apiUrl}/animerating/addAnime5/${id}/${id1}`,
      animeRatingData,
      {
        withCredentials: true,
      }
    );
  }
}
