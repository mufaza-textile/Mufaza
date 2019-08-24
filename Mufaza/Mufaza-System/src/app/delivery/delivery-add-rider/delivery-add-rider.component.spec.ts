import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAddRiderComponent } from './delivery-add-rider.component';

describe('DeliveryAddRiderComponent', () => {
  let component: DeliveryAddRiderComponent;
  let fixture: ComponentFixture<DeliveryAddRiderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryAddRiderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryAddRiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
