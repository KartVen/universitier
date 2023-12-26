import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input({ required: true }) name!: string;
  @Input() expandMode: boolean = false;
  @Input() isExpanded: boolean = false;

  protected handleExpand = () => (this.isExpanded = !this.isExpanded);
}
