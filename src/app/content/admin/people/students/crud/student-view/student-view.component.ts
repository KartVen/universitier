import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StudentService, StudentView } from '../../../../../../_services/student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-view',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './student-view.component.html',
  styleUrl: './student-view.component.scss',
})
export class StudentViewComponent implements AfterViewInit {
  protected data!: StudentView;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly studentService: StudentService
  ) {}

  ngAfterViewInit(): void {
    this.route.params.subscribe(params => {
      this.studentService.getStudent(+params['id']).subscribe({
        next: res => (this.data = res),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    });
  }
}
