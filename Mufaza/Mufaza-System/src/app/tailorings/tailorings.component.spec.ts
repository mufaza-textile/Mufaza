import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TailoringsComponent } from './tailorings.component';

describe('TailoringsComponent', () => {
  let component: TailoringsComponent;
  let fixture: ComponentFixture<TailoringsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TailoringsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TailoringsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
