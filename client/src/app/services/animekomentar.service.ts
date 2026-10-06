import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AnimeKomentar } from '../store/types/animekomentar.module';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AnimeKomentarService {
  constructor(private http: HttpClient, private router: Router) {}

  // Autor komentara se NE salje - backend ga uzima iz JWT kolacica.
  postAnimeKomentar(
    komentar: AnimeKomentar,
    id: number
  ): Observable<AnimeKomentar[]> {
    const animeRatingData = {
      komentar: komentar.komentar,
    };

    return this.http.post<AnimeKomentar[]>(
      `${environment.apiUrl}/komentar/addKomentar/${id}`,
      animeRatingData,
      {
        withCredentials: true,
      }
    );
  }
  getKomentar(id: number): Observable<AnimeKomentar[]> {
    return this.http.get<AnimeKomentar[]>(
      `${environment.apiUrl}/komentar/getKomentar/${id}`,
      {
        withCredentials: true,
      }
    );
  }
  deleteKomentar(id: number) {
    return this.http.delete<number>(
      `${environment.apiUrl}/komentar/deleteKomentar/${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
