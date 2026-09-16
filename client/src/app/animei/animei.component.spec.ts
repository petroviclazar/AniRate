import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeiComponent } from './animei.component';

describe('AnimeiComponent', () => {
  let component: AnimeiComponent;
  let fixture: ComponentFixture<AnimeiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimeiComponent]
    });
    fixture = TestBed.createComponent(AnimeiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
