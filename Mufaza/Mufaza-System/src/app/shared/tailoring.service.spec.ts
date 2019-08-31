import { TestBed } from '@angular/core/testing';

import { TailoringService } from './tailoring.service';

describe('TailoringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TailoringService = TestBed.get(TailoringService);
    expect(service).toBeTruthy();
  });
});
