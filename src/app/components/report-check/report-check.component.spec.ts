import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCheckComponent } from './report-check.component';

describe('ReportCheckComponent', () => {
  let component: ReportCheckComponent;
  let fixture: ComponentFixture<ReportCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReportCheckComponent]
    });
    fixture = TestBed.createComponent(ReportCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
