import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoqItemComponent } from './boq-item.component';

describe('BoqItemComponent', () => {
  let component: BoqItemComponent;
  let fixture: ComponentFixture<BoqItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoqItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoqItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
