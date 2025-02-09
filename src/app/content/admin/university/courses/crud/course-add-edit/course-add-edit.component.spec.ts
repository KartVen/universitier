import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAddEditComponent } from './course-add-edit.component';

describe('StaffAddComponent', () => {
  let component: CourseAddEditComponent;
  let fixture: ComponentFixture<CourseAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseAddEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
