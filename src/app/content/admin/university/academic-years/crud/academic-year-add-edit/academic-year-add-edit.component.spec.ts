import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicYearAddEditComponent } from './academic-year-add-edit.component';

describe('StaffAddComponent', () => {
  let component: AcademicYearAddEditComponent;
  let fixture: ComponentFixture<AcademicYearAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicYearAddEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcademicYearAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
