import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureOfWorkComponent } from './picture-of-work.component';

describe('PictureOfWorkComponent', () => {
  let component: PictureOfWorkComponent;
  let fixture: ComponentFixture<PictureOfWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureOfWorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureOfWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
