import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAllocateRiderComponent } from './delivery-allocate-rider.component';

describe('DeliveryAllocateRiderComponent', () => {
  let component: DeliveryAllocateRiderComponent;
  let fixture: ComponentFixture<DeliveryAllocateRiderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryAllocateRiderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryAllocateRiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
