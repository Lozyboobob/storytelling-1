import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrezManagerComponent } from './prez-manager.component';

describe('PrezManagerComponent', () => {
  let component: PrezManagerComponent;
  let fixture: ComponentFixture<PrezManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrezManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrezManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
