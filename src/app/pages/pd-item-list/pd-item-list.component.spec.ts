import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdItemListComponent } from './pd-item-list.component';

describe('PdItemListComponent', () => {
  let component: PdItemListComponent;
  let fixture: ComponentFixture<PdItemListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdItemListComponent]
    });
    fixture = TestBed.createComponent(PdItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
