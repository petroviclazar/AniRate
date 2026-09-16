import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AnimeKomentar } from '../store/types/animekomentar.module';
@Injectable({
  providedIn: 'root',
})
export class AnimeKomentarService {
  constructor(private http: HttpClient, private router: Router) {}

  postAnimeKomentar(
    komentar: AnimeKomentar,
    id: number,
    id1: number
  ): Observable<AnimeKomentar[]> {
    const animeRatingData = {
      komentar: komentar.komentar,
    };

    return this.http.post<AnimeKomentar[]>(
      `http://localhost:3000/komentar/addKomentar/${id}/${id1}`,
      animeRatingData,
      {
        withCredentials: true,
      }
    );
  }
  getKomentar(id: number): Observable<AnimeKomentar[]> {
    return this.http.get<AnimeKomentar[]>(
      ` http://localhost:3000/komentar/getKomentar/${id}`,
      {
        withCredentials: true,
      }
    );
  }
  deleteKomentar(id: number) {
    return this.http.delete<number>(
      `http://localhost:3000/komentar/deleteKomentar/${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
