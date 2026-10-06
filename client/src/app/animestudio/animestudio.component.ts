import { Component, OnInit,OnDestroy } from '@angular/core';
import { Observable, Subject, combineLatest, forkJoin, map, of } from 'rxjs'; // Dodat forkJoin
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
import {
  selectUserFeature,
  userSelector,
} from '../store/selectors/user.selectors';
import { UserRole } from '../store/types/user-role.enum';
import { AnimeStudijaService } from '../services/animeStudija.service';
import * as StudioMembershipActions from '../store/actions/studioMembership.actions';
import {
  membersForStudioSelector,
  pendingRequestsForStudioSelector,
} from '../store/selectors/studioMembership.selectors';
import { StudioMembershipModel } from '../store/types/studio-membership.module';
import { takeUntil } from 'rxjs';
import { take } from 'rxjs';
@Component({
  selector: 'app-animestudio',
  templateUrl: './animestudio.component.html',
  styleUrls: ['./animestudio.component.css'],
})
export class AnimestudioComponent implements OnInit,OnDestroy {
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
  isAdmin = false;
  isOwner = false;
  currentUserId: number | undefined;
  studioId!: number;
  zahtevPoslat = false;
  pendingRequests$: Observable<StudioMembershipModel[]> = of([]);
  members$: Observable<StudioMembershipModel[]> = of([]);
  // Da li je ulogovani korisnik vec clan ovog studija (racuna se iz liste
  // clanova, pa ostaje tacno i posle osvezavanja stranice).
  isMember$: Observable<boolean> = of(false);
  assignOwnerUserId: number | null = null;
  private lastRequestedRequestsFor: number | null = null;
  private currentStudio: AnimeStudioModel | null = null;
  private unistavanje$ =new Subject<void>();

  constructor(
    private store: Store<AnimeStudioState>,
    private store1: Store<AnimeState>,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private authService: AuthService,
    private uploadService: UploadService,
    private formBuilder: FormBuilder,
    private store3: Store<UserState>,
    private animeStudijaService: AnimeStudijaService
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
    this.store3.pipe(select(selectUserFeature),takeUntil(this.unistavanje$)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated = userState.isLoggedIn;
      this.isAdmin = userState.user?.role === UserRole.ADMIN;
      this.currentUserId = userState.user?.id;
      this.osveziVlasnistvo();
    });
    this.route.params.pipe(takeUntil(this.unistavanje$)).subscribe(async (params) => {
      // Parametar rute je string, pa ga pretvaramo u broj (+) da bi poredjenje
      // sa id-jevima iz store-a (brojevi) radilo.
      const id = +params['id'];
      this.studioId = id;
      this.zahtevPoslat = false;

      this.pendingRequests$ = this.store3.select(
        pendingRequestsForStudioSelector(id)
      );
      this.members$ = this.store3.select(membersForStudioSelector(id));
      this.isMember$ = combineLatest([
        this.members$,
        this.store3.select(userSelector),
      ]).pipe(
        map(([clanovi, user]) => clanovi.some((c) => c.user?.id === user?.id))
      );
      this.store.dispatch(
        StudioMembershipActions.getStudioMembers({ studioId: id })
      );

      this.store.dispatch(AnimeStudioActions.getAnimeStudio({ id }));
      this.store1.dispatch(AnimeiActions.getAnimeForStudio({ id }));
    });
    this.animeStudio$.pipe(takeUntil(this.unistavanje$)).subscribe((animeStudio) => {
      this.currentStudio = animeStudio;
      this.osveziVlasnistvo();
    });
  }

  // Proverava da li je ulogovani korisnik vlasnik trenutnog studija i,
  // ako jeste (ili je admin), ucitava zahteve za clanstvo za taj studio
  // (samo jednom po studiju, ne na svaku promenu stanja).
  private osveziVlasnistvo(): void {
    this.isOwner =
      !!this.currentStudio?.owner &&
      !!this.currentUserId &&
      this.currentStudio.owner.id === this.currentUserId;

    if (
      (this.isOwner || this.isAdmin) &&
      this.studioId &&
      this.lastRequestedRequestsFor !== this.studioId
    ) {
      this.lastRequestedRequestsFor = this.studioId;
      this.store.dispatch(
        StudioMembershipActions.getMembershipRequests({
          studioId: this.studioId,
        })
      );
    }
  }

  postaniClan(): void {
    if (!this.studioId) {
      return;
    }
    this.zahtevPoslat = true;
    this.store.dispatch(
      StudioMembershipActions.requestMembership({ studioId: this.studioId })
    );
  }

  odobriZahtev(requestId: number | undefined): void {
    if (requestId === undefined || !this.studioId) {
      return;
    }
    this.store.dispatch(
      StudioMembershipActions.approveRequest({
        requestId,
        studioId: this.studioId,
      })
    );
  }

  odbijZahtev(requestId: number | undefined): void {
    if (requestId === undefined || !this.studioId) {
      return;
    }
    this.store.dispatch(
      StudioMembershipActions.rejectRequest({
        requestId,
        studioId: this.studioId,
      })
    );
  }

  dodeliVlasnika(): void {
    if (!this.assignOwnerUserId || !this.studioId) {
      return;
    }
    this.animeStudijaService
      .assignOwner(this.studioId, this.assignOwnerUserId)
      .subscribe({
        next: () => {
          this.assignOwnerUserId = null;
          this.store.dispatch(
            AnimeStudioActions.getAnimeStudio({ id: this.studioId })
          );
        },
        error: (err) => {
          alert(err.error?.message || 'Dodela vlasnika nije uspela');
        },
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
    this.route.params.pipe(take(1)).subscribe(async (params) => {
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
    this.anime1$?.pipe(takeUntil(this.unistavanje$)).subscribe((res) => {
      console.log(res);
    });
  }
  ngOnDestroy(): void {
    this.unistavanje$.next();
    this.unistavanje$.complete();
  }
}
