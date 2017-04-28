import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesPresentationComponent } from './slides.component';

describe('SlidesComponent', () => {
  let component: SlidesPresentationComponent;
  let fixture: ComponentFixture<SlidesPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidesPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
