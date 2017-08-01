import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementTextComponent } from './element-text.component';

describe('ElementTextComponent', () => {
  let component: ElementTextComponent;
  let fixture: ComponentFixture<ElementTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
