import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToHomeTripComponent } from './to-home-trip.component';

describe('ToHomeTripComponent', () => {
  let component: ToHomeTripComponent;
  let fixture: ComponentFixture<ToHomeTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToHomeTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToHomeTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
