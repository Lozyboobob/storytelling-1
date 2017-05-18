import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesManagerComponent } from './slides-manager.component';

describe('SlidesManagerComponent', () => {
  let component: SlidesManagerComponent;
  let fixture: ComponentFixture<SlidesManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidesManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
