import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../../../shared/components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ModuleService, ModuleView } from '../../../../../../_services/module.service';

@Component({
  selector: 'app-module-view',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './module-view.component.html',
  styleUrl: './module-view.component.scss',
})
export class ModuleViewComponent {
  protected data!: ModuleView;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly moduleService: ModuleService
  ) {
    this.route.params.subscribe(params => {
      this.moduleService.getModule(+params['id']).subscribe({
        next: res => (this.data = res),
        error: (err: HttpErrorResponse) => console.log(err),
      });
    });
  }
}
