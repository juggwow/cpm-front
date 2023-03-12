import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInprogressComponent } from './form_inprogress.component';

describe('FormUpdateComponent', () => {
  let component: FormInprogressComponent;
  let fixture: ComponentFixture<FormInprogressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInprogressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
