import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryslipComponent } from './salaryslip.component';

describe('SalaryslipComponent', () => {
  let component: SalaryslipComponent;
  let fixture: ComponentFixture<SalaryslipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryslipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
