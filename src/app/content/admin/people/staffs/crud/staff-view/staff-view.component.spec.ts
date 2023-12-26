import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffViewComponent } from './staff-view.component';

describe('StaffAddComponent', () => {
  let component: StaffViewComponent;
  let fixture: ComponentFixture<StaffViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StaffViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
