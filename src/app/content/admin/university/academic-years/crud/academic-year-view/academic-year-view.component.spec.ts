import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicYearViewComponent } from './academic-year-view.component';

describe('StaffAddComponent', () => {
  let component: AcademicYearViewComponent;
  let fixture: ComponentFixture<AcademicYearViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicYearViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcademicYearViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
