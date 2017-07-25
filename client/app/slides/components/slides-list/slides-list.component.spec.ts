import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { SlidesListComponent } from './slides-list.component';
import { SlidesSearchComponent } from './slides-search/slides-search.component';
import { SlidesCardComponent } from './slides-card/slides-card.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {SlidesService} from '../../services/index';
import {HttpModule} from '@angular/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NotifBarService} from "app/core";

describe('SlidesListComponent', () => {
    let component: SlidesListComponent;
    let fixture: ComponentFixture<SlidesListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                FormsModule,
                BrowserAnimationsModule,
                RouterTestingModule,
                HttpModule
            ],
            declarations: [ SlidesListComponent, SlidesSearchComponent, SlidesCardComponent ],
            providers : [SlidesService, NotifBarService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SlidesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
