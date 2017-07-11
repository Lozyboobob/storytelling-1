import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrezListComponent } from './slides-manager.component';

describe('PrezListComponent', () => {
  let component: PrezListComponent;
  let fixture: ComponentFixture<PrezListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrezListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrezListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
