import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ConnectionAddEdit,
  ConnectionService,
} from '../../../../../../_services/connection.service';
import { ModuleSelectable, ModuleService } from '../../../../../../_services/module.service';
import {
  AcademicYearSelectable,
  AcademicYearService,
} from '../../../../../../_services/academic-year.service';
import Selectable from '../../../../../../shared/models/selectable';
import { GroupSelectable, GroupService } from '../../../../../../_services/group.service';
import FormArraySubForm from '../../../../../../_utils/helpers/FormArraySubForm';

@Component({
  selector: 'app-connection-add-edit',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './connection-add-edit.component.html',
  styleUrl: './connection-add-edit.component.scss',
})
export class ConnectionAddEditComponent {
  protected id: number | null = null;
  protected name = '';
  protected form!: FormGroup;
  protected groupsSubForm!: FormArraySubForm<Selectable, Selectable>;

  protected selectOptions: {
    academicYears: AcademicYearSelectable[];
    modules: ModuleSelectable[];
    groups: GroupSelectable[];
  } = {
    academicYears: [],
    modules: [],
    groups: [],
  };
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private readonly connectionService: ConnectionService,
    private readonly moduleService: ModuleService,
    private readonly academicYearService: AcademicYearService,
    private readonly groupService: GroupService
  ) {
    this.form = this.formBuilder.group({
      module: [0, [Validators.required]],
      academicYear: [0, [Validators.required]],
      groups: this.formBuilder.array<Selectable>([]),
      subFormGroups: formBuilder.group({
        group: ['', [Validators.required]],
      }),
    });
    this.groupsSubForm = new FormArraySubForm(this.form.get('groups') as FormArray);
    this.handleModuleOptions();
    this.handleAcademicYearOptions();
    this.handleGroupsOptions();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.name = `${this.id ? 'Edytuj' : 'Dodaj'} powiązanie`;
      if (this.id) {
        this.connectionService.getConnection(this.id).subscribe({
          next: res => {
            this.form.patchValue({
              ...res,
              module: res.module.id,
              academicYear: res.academicYear.id,
            });
            this.selectOptions = {
              modules: this.selectOptions.modules.filter(v => v.id === res.module.id),
              academicYears: this.selectOptions.academicYears.filter(
                v => v.id === res.academicYear.id
              ),
              groups: this.selectOptions.groups,
            };
            res.groups?.forEach(({ id, type, number }) => {
              this.groupsSubForm.add(this.formBuilder.control({ id, name: type + number }));
            });
          },
          error: (err: HttpErrorResponse) => console.log(err),
        });
      }
    });
  }

  protected handleModuleOptions() {
    this.moduleService.getModulesSelectable().subscribe({
      next: res => (this.selectOptions.modules = res),
    });
  }

  protected handleAcademicYearOptions() {
    this.academicYearService.getAcademicYearsSelectable().subscribe({
      next: res => (this.selectOptions.academicYears = res),
    });
  }

  protected handleGroupsOptions() {
    this.groupService.getGroupsSelectable().subscribe({
      next: res => (this.selectOptions.groups = res),
    });
  }

  addGroup() {
    const group = this.form.get('subFormGroups')?.getRawValue().group.split('|');
    const mappedGroup = { id: +group[0], name: group[1] };
    if (
      !this.groupsSubForm
        .values()
        .map(({ id }) => id)
        .includes(mappedGroup.id)
    )
      this.groupsSubForm.add(this.formBuilder.control(mappedGroup));
  }

  onSubmit() {
    const rawFormData = this.form.getRawValue();
    const onSave: ConnectionAddEdit = {
      moduleId: rawFormData.module,
      academicYearId: rawFormData.academicYear,
      groupsIds: this.groupsSubForm.values().map(({ id }) => id),
    };
    if (this.id) {
      this.connectionService.putConnection(this.id, onSave).subscribe({
        next: () => this.router.navigate(['university']),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    } else {
      this.connectionService.postConnection(onSave).subscribe({
        next: res => this.router.navigate(['university', 'connections', res.id]),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    }
  }

  onCancel = () => this.location.back();
  protected readonly HTMLSelectElement = HTMLSelectElement;
}
