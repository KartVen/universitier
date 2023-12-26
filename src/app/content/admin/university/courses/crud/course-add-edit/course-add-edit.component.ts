import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseAddEdit, CourseService } from '../../../../../../_services/course.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FacultySelectable, FacultyService } from '../../../../../../_services/faculty.service';

@Component({
  selector: 'app-course-add-edit',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './course-add-edit.component.html',
  styleUrl: './course-add-edit.component.scss',
})
export class CourseAddEditComponent {
  protected id: number | null = null;
  protected name = '';

  protected form!: FormGroup;
  protected academicYears!: FormArray;
  protected isAcademicYearsForm: boolean = false;

  protected facultySelectableList: FacultySelectable[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private readonly courseService: CourseService,
    private readonly facultyService: FacultyService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      faculty_id: ['', [Validators.required]],
      academic_years: this.formBuilder.array<AcademicYearSubForm>([]),
    });
    this.academicYears = this.form.get('academic_years') as FormArray;
    this.handleApi();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.name = `${this.id ? 'Edytuj' : 'Dodaj'} kierunek`;
      if (this.id) {
        this.courseService.getCourse(this.id).subscribe({
          next: res => {
            this.form.patchValue({
              ...res,
              faculty_id: res.faculty.id,
            });
            if (res.academicYears.length > 0) {
              res.academicYears.map(({ id, academicYear }) =>
                this.addAcademicYear(id, academicYear)
              );
              this.facultySelectableList = this.facultySelectableList.filter(
                ({ id }) => id === res.faculty.id
              );
            }
          },
          error: (err: HttpErrorResponse) => console.log(err),
        });
      }
    });
  }

  private handleApi() {
    this.facultyService.getFacultiesSelectable().subscribe({
      next: res => (this.facultySelectableList = res),
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }

  onSubmit() {
    const rawFormData = this.form.getRawValue();
    const onSave: CourseAddEdit = {
      name: rawFormData.name,
      facultyId: rawFormData.faculty_id,
      academicYearsIds: this.academicYears.controls.map(({ value }) => value.id),
    };
    if (this.id) {
      this.courseService.putCourse(this.id, onSave).subscribe({
        next: () => this.router.navigate(['university', 'courses', this.id]),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    } else {
      this.courseService.postCourse(onSave).subscribe({
        next: res => this.router.navigate(['university', 'courses', res.id]),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    }
  }

  onCancel = () => this.location.back();

  addAcademicYear(id: number, display: string) {
    this.academicYears.push(this.formBuilder.control<AcademicYearSubForm>({ id, display }));
  }

  removeAcademicYear(index: number) {
    this.academicYears.removeAt(index);
  }
}

type AcademicYearSubForm = { id: number; display: string };
