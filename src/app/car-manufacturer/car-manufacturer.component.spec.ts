import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarManufacturerComponent } from './car-manufacturer.component';

describe('CarManufacturerComponent', () => {
  let component: CarManufacturerComponent;
  let fixture: ComponentFixture<CarManufacturerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarManufacturerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
