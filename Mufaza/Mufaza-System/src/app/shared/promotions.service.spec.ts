/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PromotionsService } from './promotions.service';

describe('Service: Promotions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromotionsService]
    });
  });

  it('should ...', inject([PromotionsService], (service: PromotionsService) => {
    expect(service).toBeTruthy();
  }));
});
