import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBuilderComponent } from './text-builder.component';

describe('TextBuilderComponent', () => {
  let component: TextBuilderComponent;
  let fixture: ComponentFixture<TextBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
