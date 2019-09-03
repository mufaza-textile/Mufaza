import { TestBed } from '@angular/core/testing';

import { SalaryService } from './employeesalary.service';

describe('SalaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalaryService = TestBed.get(SalaryService);
    expect(service).toBeTruthy();
  });
});
