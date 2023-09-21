import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommReportWaitApproveListComponent } from './comm-report-wait-approve-list.component';

describe('CommReportWaitApproveListComponent', () => {
  let component: CommReportWaitApproveListComponent;
  let fixture: ComponentFixture<CommReportWaitApproveListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommReportWaitApproveListComponent]
    });
    fixture = TestBed.createComponent(CommReportWaitApproveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
