import { Component, OnInit } from '@angular/core';
import * as UserActions from './store/actions/user.actions';
import { UserState } from './store/types/user.interface';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Clinet';
  constructor(
    private store: Store<UserState>,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    const loggedIn = !!localStorage.getItem('isLoggedIn');
    this.store.dispatch(
      UserActions.browserRolead({ isLoading: false, isLoggedin: loggedIn })
    );

    if (!loggedIn) {
      return;
    }

    // Posle osvezavanja stranice (F5) NgRx store se prazni, pa u njemu vise
    // nema ulogovanog korisnika (ni njegove uloge). Zato ga vracamo u store:
    // 1) odmah iz localStorage-a, da se admin/vlasnik opcije odmah prikazu,
    const userJson = localStorage.getItem('loggedUser');
    if (userJson) {
      this.store.dispatch(
        UserActions.getUserSuccess({ user: JSON.parse(userJson) })
      );
    }

    // 2) pa sveze sa servera (preko JWT kolacica), jer se uloga mogla
    // promeniti u medjuvremenu (npr. admin ga je postavio za vlasnika).
    // Ako je kolacic istekao, server vraca gresku i korisnika odjavljujemo.
    this.authService.getLoggedUser().subscribe({
      next: (user: any) => {
        localStorage.setItem('loggedUser', JSON.stringify(user));
        this.store.dispatch(UserActions.getUserSuccess({ user }));
      },
      error: () => {
        this.store.dispatch(
          UserActions.logOutUserSuccess({ message: 'Sesija je istekla' })
        );
      },
    });
  }
}
