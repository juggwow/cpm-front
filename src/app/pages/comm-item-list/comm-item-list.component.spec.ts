import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommItemListComponent } from './comm-item-list.component';

describe('CommItemListComponent', () => {
  let component: CommItemListComponent;
  let fixture: ComponentFixture<CommItemListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommItemListComponent]
    });
    fixture = TestBed.createComponent(CommItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
