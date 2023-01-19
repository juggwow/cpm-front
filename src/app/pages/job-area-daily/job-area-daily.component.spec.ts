import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAreaDailyComponent } from './job-area-daily.component';

describe('JobAreaDailyComponent', () => {
  let component: JobAreaDailyComponent;
  let fixture: ComponentFixture<JobAreaDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ JobAreaDailyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAreaDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
