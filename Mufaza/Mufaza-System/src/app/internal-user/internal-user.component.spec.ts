import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalUserComponent } from './internal-user.component';

describe('InternalUserComponent', () => {
  let component: InternalUserComponent;
  let fixture: ComponentFixture<InternalUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
