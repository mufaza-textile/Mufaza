import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TailoringComponent } from './tailoring.component';

describe('TailoringComponent', () => {
  let component: TailoringComponent;
  let fixture: ComponentFixture<TailoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TailoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TailoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
