import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs'; // Dodat forkJoin
import { AnimeStudioModel } from '../store/types/animestudio.module';
import { AnimeStudioState } from '../store/types/animestudio.interface';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import {
  animeStudioSelector,
  errorSelector,
  isLoadingSelector,
} from '../store/selectors/animestudio.selectors';
import * as AnimeStudioActions from '../store/actions/animeStudio.actions';
import { Anime, AnimeModel } from '../store/types/anime.module';
import { animeSelector } from '../store/selectors/anime.selector';
import * as AnimeiActions from '../store/actions/animei.actions';
import { AnimeState } from '../store/types/anime.interface';
import {
  animestudioSelectorAnime,
  animestudioSelectorError,
  animestudioSelectorLoading,
} from '../store/selectors/animei.selector';
import * as AnimeActions from '../store/actions/anime.actions';
import { AppRoutingModule } from '../app-routing.module';
import { UploadService } from '../services/upload.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserState } from '../store/types/user.interface';
import { selectUserFeature } from '../store/selectors/user.selectors';

@Component({
  selector: 'app-animestudio',
  templateUrl: './animestudio.component.html',
  styleUrls: ['./animestudio.component.css'],
})
export class AnimestudioComponent implements OnInit {
  form!: FormGroup;
  isLoading$: Observable<boolean>;
  error$: Observable<String | null>;
  animeStudio$: Observable<AnimeStudioModel | null>;
  isLoading1$: Observable<boolean>;
  error1$: Observable<String | null>;
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  anime1$?: Observable<Anime[]>;
  newAnime: AnimeModel = {
    name: '',
    description: '',
    episodeCount: 0,
    title: '',
  };
  authenticated = true;
  isLoggedIn!: boolean;
  constructor(
    private store: Store<AnimeStudioState>,
    private store1: Store<AnimeState>,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private authService: AuthService,
    private uploadService: UploadService,
    private formBuilder: FormBuilder,
    private store3: Store<UserState>
  ) {
    this.isLoading$ = this.store.select(isLoadingSelector);
    this.error$ = this.store.select(errorSelector);
    this.animeStudio$ = this.store.select(animeStudioSelector);
    this.isLoading1$ = this.store.select(animestudioSelectorLoading);
    this.error1$ = this.store.select(animestudioSelectorError);
    this.anime1$ = this.store.select(animestudioSelectorAnime);
  }

  async ngOnInit(): Promise<void> {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      episodeCount: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
    });
    this.store.pipe(select(selectUserFeature)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated = userState.isLoggedIn;
    });
    this.route.params.subscribe(async (params) => {
      const id = params['id'];

      this.store.dispatch(AnimeStudioActions.getAnimeStudio({ id }));
      this.store1.dispatch(AnimeiActions.getAnimeForStudio({ id }));
    });
  }
  closePopup() {
    throw new Error('Method not implemented.');
  }
  handleFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.form.value.title) {
      console.log(this.form.value);
    }
  }
  addAnime() {
    this.route.params.subscribe(async (params) => {
      if (this.form.valid) {
        const info = this.form.value;
        console.log('info', info);
        const downloadURL = await this.uploadService.uploadFile(
          this.selectedFile!
        );
        const id = params['id'];
        console.log('Nesto drugo', info.title);
        this.store.dispatch(
          AnimeActions.postAnime({
            anime: {
              name: info.name,
              description: info.description,
              episodeCount: info.episodeCount,
              title: downloadURL,
            },
            id: id,
          })
        );
        this.form.reset();
        this.selectedFile = null;
      }
    });
  }

  prikazi() {
    this.anime1$?.subscribe((res) => {
      console.log(res);
    });
  }
}