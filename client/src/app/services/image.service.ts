import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  uploadImage(imageData: FormData) {
    const uploadUrl = '../../images';
    return this.http.post(uploadUrl, imageData);
  }
}
