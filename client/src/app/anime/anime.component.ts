import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserModel } from '../store/types/user.module';
import { AnimeModel } from '../store/types/anime.module';
import * as AnimeActions from '../store/actions/anime.actions';
import * as AnimeRatingActions from '../store/actions/animerating.actions';
import * as AnimeKomentarActions from '../store/actions/animekomentar.actions';
import { AnimeState } from '../store/types/anime.interface';
import { DatePipe } from '@angular/common';
import {
  isLoadingSelector,
  errorSelector,
  animeSelector,
} from '../store/selectors/anime.selector';
import {
  isLoadingAnimeKomentarSelector,
  errorAnimeKomentarSelector,
  animeKomentarSelector,
} from '../store/selectors/animekomentar.selector';
import { AnimeService } from '../services/anime.service';
import { ActivatedRoute } from '@angular/router';
import {
  AnimeRating,
  AnimeRatingModel,
} from '../store/types/animerating.module';
import {
  animeRatingSelector,
  isLoadingRatingSelector,
  errorRatingSelector,
} from '../store/selectors/animerating.selector';
import { AnimeKomentarState } from '../store/types/animekomentar.interface';
import {
  AnimeKomentar,
  AnimeKomentarModel,
} from '../store/types/animekomentar.module';
import { AnimeRatingState } from '../store/types/animerating.interface';
import { UserState } from '../store/types/user.interface';
import { selectUserFeature } from '../store/selectors/user.selectors';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css'],
})
export class AnimeComponent implements OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<String | null>;
  anime$: Observable<AnimeModel | null>;
  isLoading1$: Observable<boolean>;
  error1$: Observable<String | null>;
  animeRating$: Observable<AnimeRating | null>;
  isLoading2$: Observable<boolean>;
  error2$: Observable<String | null>;
  animeKomentar$: Observable<AnimeKomentar[]>;
  user: UserModel;
  authenticated = true;
  isLoggedIn!: boolean;

  constructor(
    private datePipe: DatePipe,
    private store: Store<AnimeState>,
    private store1: Store<AnimeKomentarState>,
    private store2: Store<AnimeRatingState>,
    private animeService: AnimeService,
    private route: ActivatedRoute,
    private store3: Store<UserState>
  ) {
    this.isLoading$ = this.store.select(isLoadingSelector);
    this.error$ = this.store.select(errorSelector);
    this.anime$ = this.store.select(animeSelector);
    this.error2$ = this.store1.select(errorAnimeKomentarSelector);
    this.isLoading2$ = this.store1.select(isLoadingAnimeKomentarSelector);
    this.animeKomentar$ = this.store1.select(animeKomentarSelector);
    this.error1$ = this.store2.select(errorRatingSelector);
    this.isLoading1$ = this.store2.select(isLoadingRatingSelector);
    this.animeRating$ = this.store2.select(animeRatingSelector);
    this.user = new UserModel(); // Inicijalizujte UserModel ovde
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log(id);
      this.store.pipe(select(selectUserFeature)).subscribe((userState) => {
        this.isLoggedIn = userState.isLoggedIn;
        this.authenticated = userState.isLoggedIn;
      });
      this.store.dispatch(AnimeActions.getAnime({ id }));
      this.store1.dispatch(AnimeKomentarActions.getAnimeKomentar({ id }));
    });

    const userJson = localStorage.getItem('loggedUser');
    if (userJson != null) {
      const userObject = JSON.parse(userJson);
      this.user = new UserModel(
        userObject.id,
        userObject.username,
        userObject.password,
        userObject.email,
        userObject.photo
      );
    }
  }
  newAnimeRating: AnimeRatingModel = {
    animeRating: 0,
  };
  newAnimeKomentar: AnimeKomentarModel = {
    komentar: '',
  };
  dodaj(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (
        this.newAnimeRating &&
        this.newAnimeRating.animeRating !== undefined &&
        this.newAnimeRating.animeRating >= 1 &&
        this.newAnimeRating.animeRating <= 10
      ) {
        if (this.user.id !== undefined) {
          this.store1.dispatch(
            AnimeRatingActions.postAnimeRating({
              animeRating: this.newAnimeRating,
              id,
              userId: this.user.id,
            })
          );

        
          this.animeRating$ = this.store1.select(animeRatingSelector);
        }
      } else {
        alert('Molim vas unesite ocenu od 1 do 10!');
      }
    });
  }
  handleImageError(event: any) {
    console.log(this.user);
    event.target.src = this.user.photo; // Postavi sliku trenutnog korisnika ako se slika ne može učitati
  }
  dodajKomentar(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];

      if (this.user.id !== undefined) {
        this.store2.dispatch(
          AnimeKomentarActions.postAnimeKomentar({
            komentar: this.newAnimeKomentar,
            id,
            userId: this.user.id,
          })
        );
        this.isLoading2$ = this.store1.select(isLoadingAnimeKomentarSelector);

        this.animeKomentar$ = this.store1.select(animeKomentarSelector);
      }
    });
  }
  dodajKodUsera(): void {
    this.route.params.subscribe((params) => {
      const animeId = params['id'];
      if (this.user.id !== undefined) {
        this.store.dispatch(
          AnimeActions.addAnimeToUser({
            userId: this.user.id,
            animeId,
          })
        );
      }
    });
  }
  delete(id: number) {
    console.log(id);
    if (confirm('Da li zaista zelite da obrisete komentar')) {
      this.store1.dispatch(AnimeKomentarActions.deleteComment({ id }));
    }
  }
  prikazi() {
    this.anime$.subscribe((res) => {
      console.log(res);
    });
  }
}
