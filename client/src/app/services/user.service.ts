import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { User, UserModel } from '../store/types/user.module';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}
  putAnime(userId: string, photo: any): Observable<User> {
    return this.http.put(
      `http://localhost:3000/user/UpdateSliku/${userId}`,
      photo,
      {
        withCredentials: true,
      }
    );
  }
  getUser(userId: number): Observable<User> {
    return this.http.get<User>(
      `http://localhost:3000/user/getUserWithId/${userId}`,
      { withCredentials: true }
    );
  }
}
