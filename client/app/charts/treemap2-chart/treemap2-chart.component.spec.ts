import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Treemap2ChartComponent } from './treemap2-chart.component';

describe('Treemap2ChartComponent', () => {
  let component: Treemap2ChartComponent;
  let fixture: ComponentFixture<Treemap2ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Treemap2ChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Treemap2ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
