import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { GroupAddEdit, GroupService } from '../../../../../../_services/group.service';

@Component({
  selector: 'app-group-add-edit',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './group-add-edit.component.html',
  styleUrl: './group-add-edit.component.scss',
})
export class GroupAddEditComponent {
  protected id: number | null = null;
  protected name = '';
  protected form!: FormGroup;

  protected groupTypes: { key: string; display: string }[] = [
    { key: 'W', display: 'Wykład' },
    { key: 'C', display: 'Ćwiczenia' },
    { key: 'L', display: 'Laboratorium' },
    { key: 'P', display: 'Projekt' },
    { key: 'LEK', display: 'Lektorat' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private readonly groupService: GroupService
  ) {
    this.form = this.formBuilder.group({
      number: [0, [Validators.required]],
      type: ['', [Validators.required]],
    });
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.name = `${this.id ? 'Edytuj' : 'Dodaj'} grupę zajęciową`;
      if (this.id) {
        this.groupService.getGroup(this.id).subscribe({
          next: res => this.form.patchValue(res),
          error: (err: HttpErrorResponse) => console.log(err),
        });
      }
    });
  }

  onSubmit() {
    const rawFormData = this.form.getRawValue();
    const onSave: GroupAddEdit = {
      number: rawFormData.number,
      type: rawFormData.type,
    };
    if (this.id) {
      this.groupService.putGroup(this.id, onSave).subscribe({
        next: () => this.router.navigate(['university', 'groups', this.id]),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    } else {
      this.groupService.postGroup(onSave).subscribe({
        next: res => this.router.navigate(['university', 'groups', res.id]),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    }
  }

  onCancel = () => this.location.back();
}
