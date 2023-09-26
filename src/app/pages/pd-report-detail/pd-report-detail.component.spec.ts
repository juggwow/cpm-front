import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdReportDetailComponent } from './pd-report-detail.component';

describe('PdReportDetailComponent', () => {
  let component: PdReportDetailComponent;
  let fixture: ComponentFixture<PdReportDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdReportDetailComponent],
    });
    fixture = TestBed.createComponent(PdReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
