import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CourseSelectable, CourseService } from '../../../../../../_services/course.service';
import { ProgrammeAddEdit, ProgrammeService } from '../../../../../../_services/programme.service';

@Component({
  selector: 'app-programme-add-edit',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './programme-add-edit.component.html',
  styleUrl: './programme-add-edit.component.scss',
})
export class ProgrammeAddEditComponent {
  protected id: number | null = null;
  protected name = '';

  protected form!: FormGroup;
  protected courseSelectableList: CourseSelectable[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private readonly programmeService: ProgrammeService,
    private readonly courseService: CourseService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      course_id: ['', [Validators.required]],
    });
    this.handleApi();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.name = `${this.id ? 'Edytuj' : 'Dodaj'} kierunek`;
      if (this.id) {
        this.programmeService.getProgramme(this.id).subscribe({
          next: res => {
            this.form.patchValue({
              ...res,
              course_id: res.course.id,
            });
            this.courseSelectableList = this.courseSelectableList.filter(
              ({ id }) => id === res.course.id
            );
          },
          error: (err: HttpErrorResponse) => console.log(err),
        });
      }
    });
  }

  private handleApi() {
    this.courseService.getCoursesSelectable().subscribe({
      next: res => (this.courseSelectableList = res),
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }

  onSubmit() {
    const rawFormData = this.form.getRawValue();
    const onSave: ProgrammeAddEdit = {
      name: rawFormData.name,
      courseId: rawFormData.course_id,
    };
    if (this.id) {
      this.programmeService.putProgramme(this.id, onSave).subscribe({
        next: () => this.router.navigate(['university', 'programmes', this.id]),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    } else {
      this.programmeService.postProgramme(onSave).subscribe({
        next: res => this.router.navigate(['university', 'programmes', res.id]),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    }
  }

  onCancel = () => this.location.back();
}
