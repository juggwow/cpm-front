import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdReportWaitApproveListComponent } from './pd-report-wait-approve-list.component';

describe('PdReportWaitApproveListComponent', () => {
  let component: PdReportWaitApproveListComponent;
  let fixture: ComponentFixture<PdReportWaitApproveListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdReportWaitApproveListComponent]
    });
    fixture = TestBed.createComponent(PdReportWaitApproveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
