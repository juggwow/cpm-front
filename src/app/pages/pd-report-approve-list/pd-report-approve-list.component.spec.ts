import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdReportApproveListComponent } from './pd-report-approve-list.component';

describe('PdReportApproveListComponent', () => {
  let component: PdReportApproveListComponent;
  let fixture: ComponentFixture<PdReportApproveListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdReportApproveListComponent]
    });
    fixture = TestBed.createComponent(PdReportApproveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
