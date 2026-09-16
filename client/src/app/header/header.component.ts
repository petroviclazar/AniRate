import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Anime } from '../store/types/anime.module';
import { Store } from '@ngrx/store';
import { AnimeState } from '../store/types/anime.interface';
import { AnimeService } from '../services/anime.service';
import {
  headerSelectorLoading,
  headerSelectorError,
  headerSelectorAnime,
} from '../store/selectors/animei.selector';
import * as AnimeiActions from '../store/actions/animei.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  anime$?: Observable<Anime[]>;
  searchText: string = '';

  brojNaslova = 0;
  prosecnaOcena = 0;
  ukupnoEpizoda = 0;
  najboljeOcenjen: Anime | null = null;

  // Emituje jednom kad se komponenta unisti; koristi se kao signal
  // za takeUntil da otkaze sve aktivne pretplate i spreci curenje memorije.
  private unistavanje$ = new Subject<void>();

  constructor(
    private animeService: AnimeService,
    private store: Store<AnimeState>
  ) {
    this.isLoading$ = this.store.select(headerSelectorLoading);
    this.error$ = this.store.select(headerSelectorError);
    this.anime$ = this.store.select(headerSelectorAnime);
  }

  ngOnInit(): void {
    this.store.dispatch(AnimeiActions.getAnimei());

    // takeUntil drzi pretplatu aktivnom sve dok unistavanje$ ne emituje,
    // sto se desava u ngOnDestroy. Bez ovoga bi pretplata na store
    // ostala aktivna i posle napustanja stranice.
    this.anime$
      ?.pipe(takeUntil(this.unistavanje$))
      .subscribe((animeList) => this.izracunajStatistiku(animeList));
  }

  ngOnDestroy(): void {
    this.unistavanje$.next();
    this.unistavanje$.complete();
  }

  // Demonstracija funkcionalnog programiranja nad nizovima: map, reduce, forEach
  izracunajStatistiku(animeList: Anime[]): void {
    if (!animeList || animeList.length === 0) {
      this.brojNaslova = 0;
      this.prosecnaOcena = 0;
      this.ukupnoEpizoda = 0;
      this.najboljeOcenjen = null;
      return;
    }

    this.brojNaslova = animeList.length;

    // map: izvuci samo ocene u poseban niz
    const ocene = animeList.map((anime) => Number(anime.rating) || 0);

    // reduce: saberi sve ocene da bismo izracunali prosek,
    // i odvojeno saberi ukupan broj epizoda u celom katalogu
    const zbirOcena = ocene.reduce((zbir, ocena) => zbir + ocena, 0);
    this.prosecnaOcena = Number((zbirOcena / this.brojNaslova).toFixed(2));

    this.ukupnoEpizoda = animeList.reduce(
      (zbir, anime) => zbir + (anime.episodeCount ?? 0),
      0
    );

    // forEach: nadji naslov sa najvecom ocenom (bez mutiranja originalnog niza)
    let trenutnoNajbolji: Anime | null = null;
    animeList.forEach((anime) => {
      if (
        trenutnoNajbolji === null ||
        Number(anime.rating) > Number(trenutnoNajbolji.rating ?? 0)
      ) {
        trenutnoNajbolji = anime;
      }
    });
    this.najboljeOcenjen = trenutnoNajbolji;
  }

  prikazi() {
    this.anime$?.subscribe((res) => {
      console.log(res);
    });
  }
  getBackgroundStyle(imageUrl: string) {
    return {
      'background-image': `url(${imageUrl})`,
    };
  }
}