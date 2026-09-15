import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AnimestudijaComponent } from './animestudija/animestudija.component';
import { AnimestudioComponent } from './animestudio/animestudio.component';
import { AnimeComponent } from './anime/anime.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CompareComponent } from './compare/compare.component';

const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HeaderComponent },
  {
    path: 'animestudija',
    component: AnimestudijaComponent,
  },
  {
    path: 'animestudio/:id',
    component: AnimestudioComponent,
  },
  {
    path: 'anime/:id',
    component: AnimeComponent,
  },
  {
    path: 'profile/:username',
    component: ProfileComponent,
  },
  {
    path: 'uporedi',
    component: CompareComponent,
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}