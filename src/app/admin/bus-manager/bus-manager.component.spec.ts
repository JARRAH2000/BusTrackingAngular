import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusManagerComponent } from './bus-manager.component';

describe('BusManagerComponent', () => {
  let component: BusManagerComponent;
  let fixture: ComponentFixture<BusManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
