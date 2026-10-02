import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from '../emmiters/emmiters';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  logout() {
    return this.http.post(
      `${environment.apiUrl}/user/logout`,
      {},
      { withCredentials: true }
    );
  }
  getLoggedUser() {
    const user = this.http.get(`${environment.apiUrl}/user/getLoggedUser`, {
      withCredentials: true,
    });
    return user;
  }
}
