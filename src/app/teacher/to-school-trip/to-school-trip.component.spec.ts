import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToSchoolTripComponent } from './to-school-trip.component';

describe('ToSchoolTripComponent', () => {
  let component: ToSchoolTripComponent;
  let fixture: ComponentFixture<ToSchoolTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToSchoolTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToSchoolTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
