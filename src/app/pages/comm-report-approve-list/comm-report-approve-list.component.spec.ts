import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommReportApproveListComponent } from './comm-report-approve-list.component';

describe('CommReportApproveListComponent', () => {
  let component: CommReportApproveListComponent;
  let fixture: ComponentFixture<CommReportApproveListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommReportApproveListComponent]
    });
    fixture = TestBed.createComponent(CommReportApproveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
