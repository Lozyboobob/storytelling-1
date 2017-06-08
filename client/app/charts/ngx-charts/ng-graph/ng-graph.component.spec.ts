import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgGraphComponent } from './ng-graph.component';

describe('NgGraphComponent', () => {
  let component: NgGraphComponent;
  let fixture: ComponentFixture<NgGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
