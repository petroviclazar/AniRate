import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css'],
})
export class SearchformComponent {
  @ViewChild('searchTextRef') searchTextRef!: ElementRef;

  constructor(private router: Router) {}

  handleSubmit(event: Event): void {
    event.preventDefault();
    const tempSearchTerm: string =
      this.searchTextRef.nativeElement.value.trim();

    // if (tempSearchTerm === '') {
    //   this.setResultTitle('Please Enter Something...');
    // } else {
    //   this.setSearchTerm(tempSearchTerm);
    //   this.setResultTitle('Your Search Result');
    // }

    this.router.navigate(['/anime']);
  }

  // setSearchTerm(term: string): void {
  //   // Implementirajte logiku za postavljanje searchTerm-a
  // }

  // setResultTitle(title: string): void {
  //   // Implementirajte logiku za postavljanje resultTitle-a
  // }
}
