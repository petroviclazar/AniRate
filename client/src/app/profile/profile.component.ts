import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Anime } from '../store/types/anime.module';
import { AnimeState } from '../store/types/anime.interface';
import { User, UserModel } from '../store/types/user.module';
import {
  animeuserSelectorAnime,
  animeuserSelectorError,
  animeuserSelectorLoading,
} from '../store/selectors/animei.selector';
import {
  selectUserFeature,
  selectorError,
  selectorLoading,
  selectorLoggedin,
  userSelector,
} from '../store/selectors/user.selectors';
import * as AnimeiActions from '../store/actions/animei.actions';
import { AnimeService } from '../services/anime.service';
import { UserState } from '../store/types/user.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UploadService } from '../services/upload.service';
import * as userActions from '../store/actions/user.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isLoading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  user?: User | null;
  isLoading1$: Observable<boolean>;
  error1$: Observable<String | null>;
  anime1$?: Observable<Anime[]>;
  useri$: Observable<UserModel | null>;
  form!: FormGroup;
  selectedFile: File | null = null;
  userImageUrl: string | null = null; // Dodajte ovu liniju
  isLoggedIn: boolean = false;

  constructor(
    private animeService: AnimeService,
    private route: ActivatedRoute,
    private store: Store<AnimeState>,
    private store1: Store<UserState>,
    private router: Router,
    private uploadService: UploadService,
    private formBuilder: FormBuilder
  ) {
    this.isLoading1$ = this.store.select(animeuserSelectorLoading);
    this.error1$ = this.store.select(animeuserSelectorError);
    this.anime1$ = this.store.select(animeuserSelectorAnime);
    this.isLoading$ = this.store1.select(selectorLoading);
    this.error$ = this.store1.select(selectorError);
    this.useri$ = this.store1.select(userSelector);
    this.user = new UserModel();
    console.log('Nestoooooo');
  }
  handleFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.form.value.photo) {
      console.log(this.form.value);
    }
  }
  updateSliku() {
    this.route.params.subscribe(async (params) => {
      if (this.form.valid) {
        const info = this.form.value;
        console.log('info', info);
        const id = params['username'];
        const downloadURL = await this.uploadService.uploadFile(
          this.selectedFile!
        );
        console.log(id);
        console.log(downloadURL);
        this.user!.photo = downloadURL;

        this.userImageUrl = downloadURL; // Ažuriranje userImageUrl
        this.store1.dispatch(
          userActions.updateSliku({
            userId: id,
            photo: {
              photo: downloadURL,
            },
          })
        );
      }
      this.store1.select(userSelector).subscribe((useri) => {
        console.log('Korisnik iz store-a:', this.useri$);

        console.log('Nenad porukica', useri?.photo);
      });
    });
  }

  async ngOnInit(): Promise<void> {
    this.form = this.formBuilder.group({
      photo: new FormControl('', Validators.required),
    });

    this.route.params.subscribe(async (params) => {
      const username = params['username']; // Preuzimanje korisničkog imena iz parametra putanje
      console.log('Korisničko ime:', username);

      // Sveže čitanje ulogovanog korisnika iz localStorage-a pri SVAKOJ
      // promeni rute (ne samo jednom pri kreiranju komponente), jer Angular
      // ponovo koristi istu instancu komponente kad se menja samo
      // parametar rute (profile/:username), pa ngOnInit ne bi rerun-ovao.
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
        this.user.photo = userObject.photo;
        this.userImageUrl = userObject.photo;
      } else {
        this.user = null;
        this.userImageUrl = null;
      }

      if (this.user && this.user.id !== undefined) {
        this.store1.dispatch(userActions.getUserStudio({ id: this.user.id }));
        this.store.dispatch(
          AnimeiActions.getAnimeForUser({ id: this.user.id })
        );
      } else {
        console.error('ID korisnika nije dostupan.');
      }

      this.useri$.subscribe((user) => {
        if (user) {
          this.isLoggedIn = true;
        }
      });
    });
  }

  prikazi() {
    this.useri$.subscribe((res) => {
      console.log(res);
    });
  }
}