import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TailoringListComponent } from './tailoring-list.component';

describe('TailoringListComponent', () => {
  let component: TailoringListComponent;
  let fixture: ComponentFixture<TailoringListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TailoringListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TailoringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
