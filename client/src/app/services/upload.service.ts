import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  async uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await firstValueFrom(
      this.http.post<{ url: string }>(
        'http://localhost:3000/upload/photo',
        formData
      )
    );

    return response.url;
  }
}