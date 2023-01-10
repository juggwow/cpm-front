import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadHomeComponent } from './rad-home.component';

describe('RadHomeComponent', () => {
  let component: RadHomeComponent;
  let fixture: ComponentFixture<RadHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
