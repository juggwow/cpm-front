import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadFormComponent } from './rad-form.component';

describe('RadFormComponent', () => {
  let component: RadFormComponent;
  let fixture: ComponentFixture<RadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
