import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-university',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './university.component.html',
  styleUrl: './university.component.scss',
})
export class UniversityComponent {}
