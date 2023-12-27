import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GroupService, GroupView } from '../../../../../../_services/group.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-group-view',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './group-view.component.html',
  styleUrl: './group-view.component.scss',
})
export class GroupViewComponent {
  protected data!: GroupView;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly groupService: GroupService
  ) {
    this.route.params.subscribe(params => {
      this.groupService.getGroup(+params['id']).subscribe({
        next: res => (this.data = res),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    });
  }
}
