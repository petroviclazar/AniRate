import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimestudijaComponent } from './animestudija.component';

describe('AnimestudijaComponent', () => {
  let component: AnimestudijaComponent;
  let fixture: ComponentFixture<AnimestudijaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimestudijaComponent],
    });
    fixture = TestBed.createComponent(AnimestudijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
