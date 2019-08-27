import { TestBed } from '@angular/core/testing';

import { employeesService } from './employees.service';

describe('employeesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: employeesService = TestBed.get(employeesService);
    expect(service).toBeTruthy();
  });
});
