import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFormAddComponent } from './job-form-add.component';

describe('JobFormAddComponent', () => {
  let component: JobFormAddComponent;
  let fixture: ComponentFixture<JobFormAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ JobFormAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
