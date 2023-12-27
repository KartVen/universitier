import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleAddEdit, ModuleService } from '../../../../../../_services/module.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ProgrammeSelectable,
  ProgrammeService,
} from '../../../../../../_services/programme.service';

@Component({
  selector: 'app-module-add-edit',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './module-add-edit.component.html',
  styleUrl: './module-add-edit.component.scss',
})
export class ModuleAddEditComponent {
  protected id: number | null = null;
  protected name = '';

  protected form!: FormGroup;
  protected programmeSelectableList: ProgrammeSelectable[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private readonly moduleService: ModuleService,
    private readonly programmeService: ProgrammeService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      ects: [0, [Validators.required]],
      hours: [0, [Validators.required]],
      is_exam: ['', [Validators.required]],
      programme_id: ['', [Validators.required]],
    });
    this.handleApi();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.name = `${this.id ? 'Edytuj' : 'Dodaj'} moduł`;
      if (this.id) {
        this.moduleService.getModule(this.id).subscribe({
          next: res => {
            this.form.patchValue({
              ...res,
              programme_id: res.programme.id,
            });
            this.programmeSelectableList = this.programmeSelectableList.filter(
              ({ id }) => id === res.programme.id
            );
          },
          error: (err: HttpErrorResponse) => console.log(err),
        });
      }
    });
  }

  private handleApi() {
    this.programmeService.getProgrammesSelectable().subscribe({
      next: res => (this.programmeSelectableList = res),
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }

  onSubmit() {
    const rawFormData = this.form.getRawValue();
    const onSave: ModuleAddEdit = {
      name: rawFormData.name,
      programmeId: rawFormData.programme_id,
      ects: rawFormData.ects,
      hours: rawFormData.hours,
      isExam: rawFormData.is_exam,
    };
    if (this.id) {
      this.moduleService.putModule(this.id, onSave).subscribe({
        next: () => this.router.navigate(['university', 'modules', this.id]),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    } else {
      this.moduleService.postModule(onSave).subscribe({
        next: res => this.router.navigate(['university', 'modules', res.id]),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    }
  }

  onCancel = () => this.location.back();
}
