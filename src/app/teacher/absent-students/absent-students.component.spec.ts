import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentStudentsComponent } from './absent-students.component';

describe('AbsentStudentsComponent', () => {
  let component: AbsentStudentsComponent;
  let fixture: ComponentFixture<AbsentStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsentStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsentStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
