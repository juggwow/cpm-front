import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommReportDetialComponent } from './comm-report-detial.component';

describe('CommReportDetialComponent', () => {
  let component: CommReportDetialComponent;
  let fixture: ComponentFixture<CommReportDetialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommReportDetialComponent]
    });
    fixture = TestBed.createComponent(CommReportDetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
