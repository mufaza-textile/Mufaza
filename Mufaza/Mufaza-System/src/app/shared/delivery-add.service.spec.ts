import { TestBed } from '@angular/core/testing';

import { DeliveryService } from './delivery-add.service';

describe('DeliveryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeliveryService = TestBed.get(DeliveryService);
    expect(service).toBeTruthy();
  });
});