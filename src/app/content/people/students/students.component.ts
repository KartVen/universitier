import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleService, Student } from '../../../_services/people.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatSortModule, MatTableModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  displayedColumns = [
    'id',
    'avatar',
    'firstName',
    'lastName',
    'status',
    'action',
  ];
  pageSizeOptions = [10, 20, 50];
  dataSource = new MatTableDataSource<Student>();
  totalElements: number | null = null;
  sortField = 'id';
  sortDirection: 'ASC' | 'DESC' = 'ASC';

  constructor(private readonly peopleService: PeopleService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.handleLoadUser();
    this.paginator.page.subscribe(event => {
      this.handleLoadUser(event.pageSize, event.pageIndex);
    });
    this.sort.sortChange.subscribe(sortState => {
      console.log(sortState);
      this.sortField = sortState.active;
      this.sortDirection = sortState.direction === 'asc' ? 'ASC' : 'DESC';
      this.handleLoadUser();
    });
  }

  protected handleLoadUser(
    pageSize = this.paginator.pageSize,
    pageIndex = this.paginator.pageIndex
  ) {
    this.peopleService
      .getStaffs(pageSize, pageIndex, this.sortField, this.sortDirection)
      .subscribe({
        next: res => {
          this.dataSource.data = res.content;
          this.dataSource.paginator = this.paginator;
          if (this.paginator.length != res.totalElements) {
            this.dataSource._updatePaginator(res.totalElements);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
  }

  public openRecord(id: number, name: string): void {
    console.log(id, name);
  }
}
