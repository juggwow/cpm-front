import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdItemReportListComponent } from './pd-item-report-list.component';

describe('PdItemReportListComponent', () => {
  let component: PdItemReportListComponent;
  let fixture: ComponentFixture<PdItemReportListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdItemReportListComponent]
    });
    fixture = TestBed.createComponent(PdItemReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
