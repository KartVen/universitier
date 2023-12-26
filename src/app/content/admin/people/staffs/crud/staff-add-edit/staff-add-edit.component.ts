import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StaffService } from '../../../../../../_services/staff.service';
import { ActivatedRoute } from '@angular/router';
import SelectOption from '../../../../../../shared/models/select_option';

@Component({
  selector: 'app-staff-add-edit',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './staff-add-edit.component.html',
  styleUrl: './staff-add-edit.component.scss',
})
export class StaffAddEditComponent {
  protected name = '';
  protected form!: FormGroup;
  protected id: number | null = null;
  protected STAFF_ROLES = ['PRACOWNIK', 'PROWADZĄCY'];
  protected EMAIL_DOMAIN = '@univerisitier.edu.pl';
  protected facultiesOptions: SelectOption[] = [];
  protected coursesOptions: SelectOption[] = [];
  protected programmesOptions: SelectOption[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private readonly staffService: StaffService
  ) {
    this.form = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email_identifier: ['', [Validators.required, this.identifierValidator]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
      position: ['', [Validators.required]],
      description: [''],
    });
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.name = 'Edytuj pracownika';
        const staff = {
          id: 1,
          firstName: 'John',
          lastName: 'Nowak',
          email: 'jnowak@universitier.edu.pl',
          password: 'q3gt7p29t2q4',
          role: 'STAFF',
          position: 'Stanowisko 1',
          description: '',
          active: true,
        };
        this.form.patchValue({
          ...staff,
          first_name: staff.firstName,
          last_name: staff.lastName,
          role: staff.role === 'STAFF' ? this.STAFF_ROLES[0] : this.STAFF_ROLES[1],
          email_identifier: staff.email.split('@')[0],
        });
        console.log(this.form.getRawValue());
      } else {
        this.name = 'Dodaj pracownika';
        this.form.patchValue({
          ...this.form.getRawValue(),
          role: this.STAFF_ROLES[0],
        });
      }
    });
  }

  protected identifierValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    return !/^[a-zA-Z][a-zA-Z0-9_]*[a-zA-Z0-9]$/.test(value) ? { customFormat: true } : null;
  };

  onSubmit() {
    const rawFormData = this.form.getRawValue();
    const save = {
      firstName: rawFormData.first_name,
      lastName: rawFormData.last_name,
      email: rawFormData.email + this.EMAIL_DOMAIN,
      password: rawFormData.password,
      role: rawFormData.role === this.STAFF_ROLES[0] ? 'STAFF' : 'LECTURER',
      position: rawFormData.position,
      description: rawFormData.description,
    };
    console.log(save);
    //this.staffService.postStaffs(save);
  }

  onCancel = () => this.location.back();

  protected isStaff = () => this.form.get('role')?.value === this.STAFF_ROLES[0];
}
