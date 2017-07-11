import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrezListCardComponent } from './prez-list-card.component';

describe('PrezListCardComponent', () => {
  let component: PrezListCardComponent;
  let fixture: ComponentFixture<PrezListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrezListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrezListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
