import { Component } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { AcademicYearsComponent } from './academic-years/academic-years.component';
import { FacultiesComponent } from './faculties/faculties.component';
import { CoursesComponent } from './courses/courses.component';

@Component({
  selector: 'app-university',
  standalone: true,
  imports: [
    CardComponent,
    CardComponent,
    AcademicYearsComponent,
    FacultiesComponent,
    CoursesComponent,
  ],
  templateUrl: './university.component.html',
  styleUrl: './university.component.scss',
})
export class UniversityComponent {}
