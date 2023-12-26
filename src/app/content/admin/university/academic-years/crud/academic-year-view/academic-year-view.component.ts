import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  AcademicYearService,
  AcademicYearView,
} from '../../../../../../_services/academic-year.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-academic-year-view',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './academic-year-view.component.html',
  styleUrl: './academic-year-view.component.scss',
})
export class AcademicYearViewComponent {
  protected data!: AcademicYearView;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly academicYearService: AcademicYearService
  ) {
    this.route.params.subscribe(params => {
      this.academicYearService.getAcademicYear(+params['id']).subscribe({
        next: res => (this.data = res),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    });
  }
}
