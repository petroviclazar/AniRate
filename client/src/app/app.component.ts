import { Component, OnInit } from '@angular/core';
import * as UserActions from './store/actions/user.actions';
import { UserState } from './store/types/user.interface';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Clinet';
  constructor(private store: Store<UserState>) {}
  ngOnInit(): void {
    let loggedIn = false;
    if (localStorage.getItem('isLoggedIn')) {
      loggedIn = true;
    } else {
      loggedIn = false;
    }
    this.store.dispatch(
      UserActions.browserRolead({ isLoading: false, isLoggedin: loggedIn })
    );
  }
}
