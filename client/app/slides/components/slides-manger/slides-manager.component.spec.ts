import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SlidesCardComponent } from './slides-card/slides-card.component'
import { SlidesMangerComponent } from './slides-manager.component';

describe('SlidesMangerComponent', () => {
  let component: SlidesMangerComponent;
  let fixture: ComponentFixture<SlidesMangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlidesMangerComponent],
      imports:[SlidesCardComponent]
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
