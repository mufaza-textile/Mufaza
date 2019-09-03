import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryemployeeComponent } from './salaryemployee.component';

describe('SalaryemployeeComponent', () => {
  let component: SalaryemployeeComponent;
  let fixture: ComponentFixture<SalaryemployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryemployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
