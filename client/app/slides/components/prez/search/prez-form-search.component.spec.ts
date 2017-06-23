import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrezFormSearchComponent } from './prez-form-search.component';

describe('PrezFormSearchComponent', () => {
  let component: PrezFormSearchComponent;
  let fixture: ComponentFixture<PrezFormSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrezFormSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrezFormSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
