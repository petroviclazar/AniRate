import { Component, OnInit } from '@angular/core';
import { Observable, defaultIfEmpty } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AnimeStudioModel } from '../store/types/animestudio.module';
import { AnimeStudijaService } from '../services/animeStudija.service';
import { AnimeStudijaState } from '../store/types/animeStudija.interface';
import {
  selectorError,
  selectorLoading,
  selectorAnimeStudija,
} from '../store/selectors/animestudija.selectors';
import * as AnimeStudijaActions from '../store/actions/animeStudija.actions';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UploadService } from '../services/upload.service';
import { UserState } from '../store/types/user.interface';
import { selectUserFeature } from '../store/selectors/user.selectors';
@Component({
  selector: 'app-animestudija',
  templateUrl: './animestudija.component.html',
  styleUrls: ['./animestudija.component.css'],
})
export class AnimestudijaComponent implements OnInit {
  form!: FormGroup;

  isLoading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  animeStudija$?: Observable<AnimeStudioModel[]>;
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  // Dodajte model za novi Anime studio
  newAnimeStudio: AnimeStudioModel = {
    name: '',
    slika: '',
  };

  // Dodajte varijablu za izabranu sliku
  selectedImage: File | null = null;
  authenticated = true;
  isLoggedIn!: boolean;
  constructor(
    private animeStudijaService: AnimeStudijaService,
    private store: Store<AnimeStudijaState>,
    private uploadService: UploadService,
    private formBuilder: FormBuilder,
    private store3: Store<UserState>
  ) {
    this.isLoading$ = this.store.select(selectorLoading);
    this.error$ = this.store.select(selectorError);
    this.animeStudija$ = this.store
      .select(selectorAnimeStudija)
      .pipe(defaultIfEmpty([]));
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      slika: new FormControl('', Validators.required),
    });
    this.store.pipe(select(selectUserFeature)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated = userState.isLoggedIn;
    });
    this.store.dispatch(AnimeStudijaActions.getAnimeStudija());
  }
  prikazi() {
    this.animeStudija$?.subscribe((res) => {
      console.log(res);
    });
  }
  handleFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.form.value.slika) {
      console.log(this.form.value);
    }
  }
  getBackgroundStyle(imageUrl: string | undefined) {
    if (imageUrl) {
      return {
        'background-image': `url(${imageUrl})`,
      };
    }
    return {};
  }
  // Funkcija za dodavanje Anime studija
  async addAnimeStudio() {
    if (this.form.valid) {
      const info = this.form.value;
      console.log('info', info);
      const downloadURL = await this.uploadService.uploadFile(
        this.selectedFile!
      );
      console.log('Nesto drugo', info.slika);
      this.store.dispatch(
        AnimeStudijaActions.postAnimeStudija({
          animeStudio: {
            name: info.name,
            slika: downloadURL,
          },
        })
      );
      this.form.reset();
      this.selectedFile = null;
    }
   
  }
}