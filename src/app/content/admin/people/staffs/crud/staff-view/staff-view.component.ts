import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StaffService, StaffView } from '../../../../../../_services/staff.service';

@Component({
  selector: 'app-staff-view',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './staff-view.component.html',
  styleUrl: './staff-view.component.scss',
})
export class StaffViewComponent implements AfterViewInit {
  protected staff!: StaffView;

  constructor(private readonly staffService: StaffService) {}

  ngAfterViewInit(): void {
    this.staff = {
      id: 1,
      firstName: 'John',
      lastName: 'Nowak',
      email: 'jnowak@universitier.edu.pl',
      password: 'q3gt7p29t2q4',
      role: 'STAFF',
      position: 'Stanowisko 1',
      description: '',
      active: true,
    };
  }

  protected mapRole(role: string) {
    return role === 'STAFF' ? 'PRACOWNIK' : 'PROWADZĄCY';
  }
}
