import { Component } from '@angular/core';
import { zip } from 'rxjs';
import { AnimeService } from '../services/anime.service';
import { Anime } from '../store/types/anime.module';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css'],
})
export class CompareComponent {
  idPrvi: number | null = null;
  idDrugi: number | null = null;
  animePrvi: Anime | null = null;
  animeDrugi: Anime | null = null;
  greska: string | null = null;
  ucitano = false;

  pregledPrvi: string | null = null;
  pregledDrugi: string | null = null;

  constructor(private animeService: AnimeService) {}

  // Demonstracija native fetch API-ja + Promise-a (async/await), odvojeno
  // od Angular HttpClient/RxJS toka koji se koristi za glavni prikaz.
  // Koristi se za brz, "usput" pregled naziva naslova dok korisnik jos
  // kuca ID, pre nego sto klikne na glavno dugme "Uporedi".
  async brziPregled(id: number | null, koji: 'prvi' | 'drugi'): Promise<void> {
    if (!id) {
      return;
    }
    try {
      const odgovor = await fetch(
        `http://localhost:3000/anime/getAnimeById/${id}`,
        { credentials: 'include' }
      );
      if (!odgovor.ok) {
        throw new Error('Naslov nije pronadjen');
      }
      const anime = (await odgovor.json()) as Anime;
      if (koji === 'prvi') {
        this.pregledPrvi = anime.name ?? null;
      } else {
        this.pregledDrugi = anime.name ?? null;
      }
    } catch (e) {
      if (koji === 'prvi') {
        this.pregledPrvi = null;
      } else {
        this.pregledDrugi = null;
      }
    }
  }

  uporedi(): void {
    this.greska = null;
    this.animePrvi = null;
    this.animeDrugi = null;

    if (!this.idPrvi || !this.idDrugi) {
      this.greska = 'Unesi ID oba anime naslova koja želiš da uporediš.';
      return;
    }

    // zip čeka da OBA zahteva zavrse i uparuje ih po redosledu emitovanja
    // (za razliku od combineLatest koji bi reagovao na svaku pojedinacnu
    // promenu) - ovde nam bas treba par (prvi, drugi) tacno jednom, sto
    // odgovara semantici jednokratnog HTTP GET poziva.
    zip(
      this.animeService.getAnimeByStudio(this.idPrvi),
      this.animeService.getAnimeByStudio(this.idDrugi)
    ).subscribe({
      next: ([prvi, drugi]) => {
        this.animePrvi = prvi;
        this.animeDrugi = drugi;
        this.ucitano = true;
      },
      error: () => {
        this.greska = 'Nisam uspeo da učitam jedan ili oba anime naslova. Proveri da li ID-jevi postoje.';
      },
    });
  }

  // Handler za (dodajULlistu) @Output dogadjaj iz child app-compare-card komponente
  dodajUListu(animeId: number): void {
    const userJson = localStorage.getItem('loggedUser');
    if (!userJson) {
      this.greska = 'Moraš biti ulogovan da bi dodao naslov u svoju listu.';
      return;
    }
    const user = JSON.parse(userJson);
    this.animeService.addAnimeToUser(user.id, animeId).subscribe({
      next: () => {
        this.greska = null;
      },
      error: () => {
        this.greska = 'Nisam uspeo da dodam naslov u tvoju listu.';
      },
    });
  }
}