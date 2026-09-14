import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Dodajte FormsModule
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchformComponent } from './searchform/searchform.component'; // Importujte RegistrationComponent
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { reducers } from './store/reducers/user.reducers';
import { AnimeComponent } from './anime/anime.component';
import { AuthService } from './services/auth.service';
import { UserEffects } from './store/effects/user.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AnimestudioComponent } from './animestudio/animestudio.component';
import { AnimestudijaComponent } from './animestudija/animestudija.component';
import { DatePipe } from '@angular/common';
import { reducers2 } from './store/reducers/animeStudija.reducers';
import { AnimeStudijaEffects } from './store/effects/AnimeStudija.effects';
import { AnimeStudioEffects } from './store/effects/animeStudio.effects';
import { AnimeiComponent } from './animei/animei.component';
import { CompareComponent } from './compare/compare.component';
import { CompareCardComponent } from './compare-card/compare-card.component';
import { AnimeEffects } from './store/effects/anime.effects';
import { AnimeiEffects } from './store/effects/animei.effects';
import { reducers3 } from './store/reducers/animeStudio.reducers';
import { reducer4 } from './store/reducers/anime.reducers';
import { animeCatalogReducer } from './store/reducers/animeCatalog.reducers';
import { animeByStudioReducer } from './store/reducers/animeByStudio.reducers';
import { animeByUserReducer } from './store/reducers/animeByUser.reducers';
import { reducer8 } from './store/reducers/animerating.reducers';
import { AnimeRatingEffects } from './store/effects/animerating.effects';
import { FilterPipe } from './filter/filter.pipe';
import { ProfileComponent } from './profile/profile.component';

import { reducer10 } from './store/reducers/animekomentar.reducers';
import { AnimeKomentarEffects } from './store/effects/animekomentar.effects';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HeaderComponent,
    NavbarComponent,
    SearchformComponent,
    AnimeComponent,
    AnimestudioComponent,
    AnimestudijaComponent,
    AnimeiComponent,
    CompareComponent,
    CompareCardComponent,
    FilterPipe,
    ProfileComponent,
    NotFoundComponent,
  ], // Dodajte RegistrationComponent ovde
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature('AnimeStudija', reducers2),
    StoreModule.forFeature('animeStudio', reducers3),
    StoreModule.forFeature('AnimeCatalog', animeCatalogReducer),
    StoreModule.forFeature('AnimeByStudio', animeByStudioReducer),
    StoreModule.forFeature('AnimeByUser', animeByUserReducer),
    StoreModule.forFeature('Anime', reducer4),
    StoreModule.forFeature('AnimeRating', reducer8),
    StoreModule.forFeature('AnimeKomentar', reducer10),
    StoreModule.forRoot({ user: reducers }, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: true,
      autoPause: true,
    }),
    EffectsModule.forRoot([
      UserEffects,
      AnimeStudijaEffects,
      AnimeStudioEffects,
      AnimeiEffects,
      AnimeEffects,
      AnimeRatingEffects,
      AnimeKomentarEffects,
    ]),
  ], // Dodajte FormsModule ovde
  providers: [AuthService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}