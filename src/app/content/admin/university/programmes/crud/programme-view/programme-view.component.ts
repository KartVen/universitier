import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ProgrammeService, ProgrammeView } from '../../../../../../_services/programme.service';

@Component({
  selector: 'app-programme-view',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './programme-view.component.html',
  styleUrl: './programme-view.component.scss',
})
export class ProgrammeViewComponent {
  protected data!: ProgrammeView;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly programmeService: ProgrammeService
  ) {
    this.route.params.subscribe(params => {
      this.programmeService.getProgramme(+params['id']).subscribe({
        next: res => (this.data = res),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    });
  }
}
