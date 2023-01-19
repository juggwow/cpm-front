import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadCreateListComponent } from './rad-create-list.component';

describe('RadCreateListComponent', () => {
  let component: RadCreateListComponent;
  let fixture: ComponentFixture<RadCreateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadCreateListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadCreateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
