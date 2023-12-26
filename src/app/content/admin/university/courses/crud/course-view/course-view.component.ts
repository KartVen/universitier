import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CourseService, CourseView } from '../../../../../../_services/course.service';

@Component({
  selector: 'app-course-view',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.scss',
})
export class CourseViewComponent {
  protected data!: CourseView;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly courseService: CourseService
  ) {
    this.route.params.subscribe(params => {
      this.courseService.getCourse(+params['id']).subscribe({
        next: res => (this.data = res),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    });
  }

  protected academicYearOrder(academicYears: { id: number; academicYear: string }[]) {
    return academicYears.sort((a, b) => a.academicYear.localeCompare(b.academicYear));
  }
}
