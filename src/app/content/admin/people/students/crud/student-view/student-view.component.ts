import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StudentService, StudentView } from '../../../../../../_services/student.service';

@Component({
  selector: 'app-student-view',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './student-view.component.html',
  styleUrl: './student-view.component.scss',
})
export class StudentViewComponent implements AfterViewInit {
  protected student!: StudentView;

  constructor(private readonly studentService: StudentService) {}

  ngAfterViewInit(): void {
    this.student = {
      id: 1,
      firstName: 'John',
      lastName: 'Nowak',
      email: 'jnowak@universitier.edu.pl',
      password: 'q3gt7p29t2q4',
      role: 'STUDENT',
      position: 'Stanowisko 1',
      description: '',
      active: true,
    };
  }
}
