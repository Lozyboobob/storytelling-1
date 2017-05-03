import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesCreatorComponent } from './slides-creator.component';

describe('SlidesCreatorComponent', () => {
  let component: SlidesCreatorComponent;
  let fixture: ComponentFixture<SlidesCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidesCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
