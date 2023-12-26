import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table-searcher',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './table-searcher.component.html',
  styleUrl: './table-searcher.component.scss',
})
export class TableSearcherComponent implements AfterViewInit {
  @Input() placeholder: string = 'Szukaj...';
  @Output() inputValue = new EventEmitter<string>();
  @Output() addEmit = new EventEmitter<void>();

  ngAfterViewInit(): void {
    this.inputValue.emit();
  }

  protected applyInput(event: Event) {
    this.inputValue.emit((event.target as HTMLInputElement).value);
  }

  addRecord() {
    this.addEmit.emit();
  }
}
