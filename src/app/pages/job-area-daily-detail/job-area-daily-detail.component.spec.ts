import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { JobAreaDailyDetailComponent } from './job-area-daily-detail.component';

describe('JobAreaDailyDetailComponent', () => {
    let component: JobAreaDailyDetailComponent;
    let fixture: ComponentFixture<JobAreaDailyDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                JobAreaDailyDetailComponent,
                BreadcrumbModule,
                RouterTestingModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(JobAreaDailyDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
