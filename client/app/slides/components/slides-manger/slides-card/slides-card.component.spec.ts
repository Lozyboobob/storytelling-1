import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SlidesCardComponent } from './slides-card.component';
import { MaterialModule } from '@angular/material';
import { SlidesService } from '../../../services/slides.service';
import { HttpModule } from '@angular/http';
describe('SlidesCardComponent', () => {
  let component: SlidesCardComponent;
  let fixture: ComponentFixture<SlidesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        MaterialModule
      ],
      declarations: [ SlidesCardComponent ],
      providers:[SlidesService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
