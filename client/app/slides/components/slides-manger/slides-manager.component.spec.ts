import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
import { MaterialModule } from '@angular/material';
import {SlidesCardComponent } from './slides-card/slides-card.component';
import {SlidesSearchComponent } from './slides-search/slides-search.component';
import { SlidesMangerComponent } from './slides-manager.component';
import {NotifBarService} from "app/core";
import {SlidesService} from '../../services/index';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('SlidesMangerComponent', () => {
    let component: SlidesMangerComponent;
    let fixture: ComponentFixture<SlidesMangerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SlidesMangerComponent,
                SlidesCardComponent,
                SlidesSearchComponent
            ],
            imports: [
                RouterTestingModule,
                NgReduxTestingModule,
                MaterialModule,
                FormsModule,
                HttpModule,
                BrowserAnimationsModule
            ],
            providers: [SlidesService, NotifBarService]
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
