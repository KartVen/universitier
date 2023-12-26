import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { StaffsComponent } from './staffs/staffs.component';
import { StudentsComponent } from './students/students.component';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [CommonModule, CardComponent, StaffsComponent, StudentsComponent],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent {}
