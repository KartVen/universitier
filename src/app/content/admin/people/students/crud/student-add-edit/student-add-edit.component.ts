import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StudentService } from '../../../../../../_services/student.service';
import { ActivatedRoute } from '@angular/router';
import SelectOption from '../../../../../../shared/models/select_option';

@Component({
  selector: 'app-student-add-edit',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './student-add-edit.component.html',
  styleUrl: './student-add-edit.component.scss',
})
export class StudentAddEditComponent {
  protected name = '';
  protected id: number | null = null;

  protected form!: FormGroup;
  protected membership!: FormArray;
  protected isMembershipForm: boolean = false;

  protected membershipFormState: (number | null)[] = [null, null, null];
  protected facultiesOptions: SelectOption[] = [
    {
      id: 1,
      name: 'Wydział Elektroniki i Informatyki',
    },
    {
      id: 1,
      name: 'Wydział Elektroniki i Informatyki',
    },
  ];
  protected coursesOptions: SelectOption[] = [
    {
      id: 1,
      name: 'Test',
    },
  ];
  protected programmesOptions: SelectOption[] = [
    {
      id: 1,
      name: 'Test',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private readonly studentService: StudentService
  ) {
    this.form = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
      membership: this.formBuilder.array<MembershipItem>([]),
    });
    this.membership = this.form.get('membership') as FormArray;
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.name = `${this.id ? 'Edytuj' : 'Dodaj'} studenta`;
      if (this.id) {
        const student = {
          id: 1,
          firstName: 'John',
          lastName: 'Nowak',
          email: '167800@universitier.edu.pl',
          password: 'q3gt7p29t2q4',
          role: 'STUDENT',
          active: true,
        };
        this.form.patchValue({
          ...student,
          first_name: student.firstName,
          last_name: student.lastName,
          role: student.role,
          email_identifier: student.email.split('@')[0],
        });
        console.log(this.form.getRawValue());
      }
    });
  }

  protected identifierValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    return !/^[a-zA-Z][a-zA-Z0-9_]*[a-zA-Z0-9]$/.test(value) ? { customFormat: true } : null;
  };

  protected updateMembershipFormState(index: number, target: EventTarget | null) {
    if (target) this.membershipFormState[index] = +(target as HTMLSelectElement).value;
    console.log(this.membershipFormState);
  }

  addMembership() {
    this.membership.push(
      this.formBuilder.control<MembershipItem>({ id: 1, display: 'WEII/Informatyka/AA' })
    );
  }

  removeMembership(index: number) {
    this.membership.removeAt(index);
  }

  onSubmit() {
    const rawFormData = this.form.getRawValue();
    const save = {
      firstName: rawFormData.first_name,
      lastName: rawFormData.last_name,
      password: rawFormData.password,
      role: rawFormData.role,
      position: rawFormData.position,
      description: rawFormData.description,
    };
    console.log(save);
    //this.studentService.postStudents(save);
  }

  onCancel = () => this.location.back();
}

type MembershipItem = { id: number; display: string };
