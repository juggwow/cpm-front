import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRadComponent } from './page-rad.component';

describe('PageRadComponent', () => {
  let component: PageRadComponent;
  let fixture: ComponentFixture<PageRadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageRadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
