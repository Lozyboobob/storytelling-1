import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrezFormComponent } from './prez-form.component';

describe('PrezFormComponent', () => {
  let component: PrezFormComponent;
  let fixture: ComponentFixture<PrezFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrezFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrezFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
