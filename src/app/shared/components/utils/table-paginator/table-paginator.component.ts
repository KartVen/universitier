import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table-paginator',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './table-paginator.component.html',
  styleUrl: './table-paginator.component.scss',
})
export class TablePaginatorComponent implements AfterViewInit {
  @Input({ required: true }) sizePerPageOptions!: number[];
  @Input({ required: true }) totalElements!: number;

  protected currentPage: number = 1;
  protected currentSizePerPage: number = 0;

  @Output() page = new EventEmitter<number>();
  @Output() sizePerPage = new EventEmitter<number>();

  ngAfterViewInit(): void {
    if (this.sizePerPageOptions.length > 0) this.currentSizePerPage = this.sizePerPageOptions[0];
    this.page.emit(this.currentPage);
    this.sizePerPage.emit(this.currentSizePerPage);
  }

  protected onPageChange(newPage: number) {
    const totalPages = this.calcPages().length;
    if (newPage > 0 && newPage <= totalPages) {
      this.currentPage = newPage;
      this.page.emit(newPage);
    }
  }

  protected onPageSizeChange(target: EventTarget | null) {
    if (target) {
      this.currentSizePerPage = +(target as HTMLSelectElement).value;
      this.sizePerPage.emit(this.currentSizePerPage);
    }
  }

  protected calcPages() {
    const modulo = this.totalElements % this.currentSizePerPage;
    return Array.from(
      { length: (this.totalElements - modulo) / this.currentSizePerPage + (modulo ? 1 : 0) },
      (_: any, index: number) => index + 1
    );
  }
}
