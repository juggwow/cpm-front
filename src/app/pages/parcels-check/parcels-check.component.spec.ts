import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelsCheckComponent } from './parcels-check.component';

describe('ParcelsCheckComponent', () => {
  let component: ParcelsCheckComponent;
  let fixture: ComponentFixture<ParcelsCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelsCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParcelsCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
