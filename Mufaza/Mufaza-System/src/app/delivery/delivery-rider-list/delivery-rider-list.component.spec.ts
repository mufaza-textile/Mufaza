import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryRiderListComponent } from './delivery-rider-list.component';

describe('DeliveryRiderListComponent', () => {
  let component: DeliveryRiderListComponent;
  let fixture: ComponentFixture<DeliveryRiderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryRiderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryRiderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
