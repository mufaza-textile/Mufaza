import { TestBed, inject } from '@angular/core/testing';

import { NewPriceService } from './new-price.service';

describe('NewPriceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewPriceService]
    });
  });

  it('should be created', inject([NewPriceService], (service: NewPriceService) => {
    expect(service).toBeTruthy();
  }));
});
