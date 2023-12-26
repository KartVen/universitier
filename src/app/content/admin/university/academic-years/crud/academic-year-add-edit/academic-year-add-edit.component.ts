import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AcademicYearEdit,
  AcademicYearService,
} from '../../../../../../_services/academic-year.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-academic-year-add-edit',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './academic-year-add-edit.component.html',
  styleUrl: './academic-year-add-edit.component.scss',
})
export class AcademicYearAddEditComponent {
  protected id: number | null = null;
  protected name = '';
  protected form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private readonly academicYearService: AcademicYearService
  ) {
    this.form = this.formBuilder.group({
      number: [0, [Validators.required]],
      academic_year: ['', [Validators.required]],
    });
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.name = 'Edytuj rok akademicki';
        this.academicYearService.getAcademicYear(this.id).subscribe({
          next: res =>
            this.form.patchValue({
              ...res,
              academic_year: res.academicYear,
            }),
          error: (err: HttpErrorResponse) => console.log(err),
        });
      } else {
        this.name = 'Dodaj rok akademicki';
      }
    });
  }

  onSubmit() {
    const rawFormData = this.form.getRawValue();
    const onSave: AcademicYearEdit = {
      number: rawFormData.number,
      academicYear: rawFormData.academic_year,
    };
    if (this.id) {
      this.academicYearService.putAcademicYear(this.id, onSave).subscribe({
        next: () => this.router.navigate(['university', 'academic-years', this.id]),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    } else {
      this.academicYearService.postAcademicYear(onSave).subscribe({
        next: res => this.router.navigate(['university', 'academic-years', res.id]),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    }
  }

  onCancel = () => this.location.back();
}
