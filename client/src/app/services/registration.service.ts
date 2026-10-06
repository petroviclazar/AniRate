import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  async registerUser(formData: any): Promise<boolean> {
    try {
      await this.http
        .post(`${environment.apiUrl}/user/addUser`, formData)
        .toPromise();
      return true;
    } catch (error) {
      return false;
    }
  }
  async checkExistingUser(username: string): Promise<boolean> {
    try {
      const response = await this.http
        .get(`${environment.apiUrl}/user/getUserByUsername/${username}`)
        .toPromise();

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
