import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialManagerComponent } from './testimonial-manager.component';

describe('TestimonialManagerComponent', () => {
  let component: TestimonialManagerComponent;
  let fixture: ComponentFixture<TestimonialManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestimonialManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
