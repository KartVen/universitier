import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicYearsComponent } from './academic-years.component';

describe('SemestersComponent', () => {
  let component: AcademicYearsComponent;
  let fixture: ComponentFixture<AcademicYearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicYearsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcademicYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});