import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FacultyService, FacultyView } from '../../../../../../_services/faculty.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-faculty-view',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './faculty-view.component.html',
  styleUrl: './faculty-view.component.scss',
})
export class FacultyViewComponent {
  protected data!: FacultyView;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly facultyService: FacultyService
  ) {
    this.route.params.subscribe(params => {
      this.facultyService.getFaculty(+params['id']).subscribe({
        next: res => (this.data = res),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    });
  }
}
