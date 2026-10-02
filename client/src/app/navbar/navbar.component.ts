import { Component, OnInit } from '@angular/core';
import { User, UserModel } from '../store/types/user.module';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Store, select } from '@ngrx/store';
import { UserState } from '../store/types/user.interface';
import { selectUserFeature } from '../store/selectors/user.selectors';
import * as UserActions from '../store/actions/user.actions';
import { UserRole } from '../store/types/user-role.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  toggleMenu = false;
  showDropdown = false;
  logoImg = '../../images/logo.jpg';
  authenticated = true;
  user!: User | null;
  isLoggedIn!: boolean;
  user1: UserModel;
  isAdmin = false;
  handleNavBar() {
    console.log(this.logoImg);
    this.toggleMenu = !this.toggleMenu;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private store: Store<UserState>
  ) {
    this.user1 = new UserModel();
  }

  ngOnInit(): void {
    this.store.pipe(select(selectUserFeature)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated = userState.isLoggedIn;
      if (userState.user) {
        this.user1 = new UserModel(
          userState.user.id,
          userState.user.username,
          userState.user.password,
          userState.user.email,
          userState.user.photo,
          userState.user.role
        );
      } else {
        this.user1 = new UserModel();
      }
      this.isAdmin = this.user1.role === UserRole.ADMIN;
    });
  }

  logout(): void {
    console.log(this.user1);
    this.user = null;
    console.log(this.user);

    this.store.dispatch(UserActions.logOutUser());
  }
}