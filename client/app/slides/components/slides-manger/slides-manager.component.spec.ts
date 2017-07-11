import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesMangerComponent } from './slides-manager.component';

describe('SlidesMangerComponent', () => {
  let component: SlidesMangerComponent;
  let fixture: ComponentFixture<SlidesMangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlidesMangerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesMangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
