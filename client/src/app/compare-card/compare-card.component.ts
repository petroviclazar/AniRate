import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Anime } from '../store/types/anime.module';

@Component({
  selector: 'app-compare-card',
  templateUrl: './compare-card.component.html',
  styleUrls: ['./compare-card.component.css'],
})
export class CompareCardComponent {
  // @Input: roditelj (CompareComponent) prosledjuje podatke o anime naslovu
  @Input() anime: Anime | null = null;

  // @Output: dete obavestava roditelja da je korisnik kliknuo na dugme,
  // saljuci id anime naslova nazad na gore
  @Output() dodajULlistu = new EventEmitter<number>();

  onDodaj(): void {
    if (this.anime?.id !== undefined) {
      this.dodajULlistu.emit(this.anime.id);
    }
  }
}