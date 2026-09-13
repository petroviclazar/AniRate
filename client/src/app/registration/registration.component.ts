import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  username: string = ''; // Dodajte inicijalizaciju za korisničko ime
  password: string = ''; // Dodajte inicijalizaciju za lozinku
  email: string = '';
  photo: string = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    private registrationService: RegistrationService,
    private uploadService: UploadService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required),
    });
  }

  async register() {
    console.log(this.form.value);
    if (this.form.valid) {
      const info = this.form.value;
      console.log('info', info);
      try {
        const downloadURL = await this.uploadService.uploadFile(
          this.selectedFile!
        );
        console.log('Nesto drugo', downloadURL);
        const formData = {
          username: info.username,
          password: info.password,
          photo: downloadURL,
          email: info.email,
        };
        const existingUser = await this.registrationService.checkExistingUser(
          info.username
        );
        console.log(existingUser);
        if (existingUser) {
          console.error('Korisnik sa istim korisničkim imenom već postoji');
          alert('Postoji dati username');
          return;
        }
        const success = await this.registrationService.registerUser(
          formData
        );
        console.log(success);
        if (success) {
          this.router.navigate(['/login']);
          console.log('Registracija uspešna');
          alert('Uspesna registracija mozete se prijaviti');
        } else {
          console.error('Greška prilikom registracije');
          alert('Greška prilikom registracije, pokušaj ponovo');
        }
      } catch (error) {
        console.error('Greška prilikom registracije', error);
        alert('Greška prilikom registracije, pokušaj ponovo');
      }
    } else {
      alert('Unesi korisničko ime i lozinku');
    }
  }
  handleFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.form.value.photo) {
      console.log(this.form.value);
    }
  }
}