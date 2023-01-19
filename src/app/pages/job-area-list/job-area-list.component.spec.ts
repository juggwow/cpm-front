import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAreaComponent } from './job-area-list.component';

describe('JobAreaComponent', () => {
    let component: JobAreaComponent;
    let fixture: ComponentFixture<JobAreaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [JobAreaComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(JobAreaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
