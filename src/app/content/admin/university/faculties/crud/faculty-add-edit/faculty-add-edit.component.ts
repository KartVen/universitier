import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyEdit, FacultyService } from '../../../../../../_services/faculty.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-faculty-add-edit',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './faculty-add-edit.component.html',
  styleUrl: './faculty-add-edit.component.scss',
})
export class FacultyAddEditComponent {
  protected id: number | null = null;
  protected name = '';
  protected form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private readonly facultyService: FacultyService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      shortname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      year_founded: ['', [Validators.required]],
    });
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.name = `${this.id ? 'Edytuj' : 'Dodaj'} wydział`;
      if (this.id) {
        this.facultyService.getFaculty(this.id).subscribe({
          next: res =>
            this.form.patchValue({
              ...res,
              shortname: res.shortName,
              year_founded: res.yearFounded,
            }),
          error: (err: HttpErrorResponse) => console.log(err),
        });
      }
    });
  }

  onSubmit() {
    const rawFormData = this.form.getRawValue();
    const onSave: FacultyEdit = {
      name: rawFormData.name,
      address: rawFormData.address,
      shortName: rawFormData.shortname,
      yearFounded: rawFormData.year_founded,
    };
    if (this.id) {
      this.facultyService.putFaculty(this.id, onSave).subscribe({
        next: () => this.router.navigate(['university', 'faculties', this.id]),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    } else {
      this.facultyService.postFaculty(onSave).subscribe({
        next: res => this.router.navigate(['university', 'faculties', res.id]),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    }
  }

  onCancel = () => this.location.back();
}
