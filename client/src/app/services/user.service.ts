import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User, UserModel } from '../store/types/user.module';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}
  putAnime(userId: string, photo: any): Observable<User> {
    return this.http.put(
      `${environment.apiUrl}/user/UpdateSliku/${userId}`,
      photo,
      {
        withCredentials: true,
      }
    );
  }
  getUser(userId: number): Observable<User> {
    return this.http.get<User>(
      `${environment.apiUrl}/user/getUserWithId/${userId}`,
      { withCredentials: true }
    );
  }
}
