import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimestudioComponent } from './animestudio.component';

describe('AnimestudioComponent', () => {
  let component: AnimestudioComponent;
  let fixture: ComponentFixture<AnimestudioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimestudioComponent]
    });
    fixture = TestBed.createComponent(AnimestudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
