import { TestBed } from '@angular/core/testing';

import { SizesService } from './sizes.service';

describe('SizesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SizesService = TestBed.get(SizesService);
    expect(service).toBeTruthy();
  });
});
