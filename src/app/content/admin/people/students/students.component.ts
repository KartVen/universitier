import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TablePaginatorComponent } from '../../../../shared/components/utils/table-paginator/table-paginator.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TableSearcherComponent } from '../../../../shared/components/utils/table-searcher/table-searcher.component';
import { FilterParams } from '../../../../shared/models/api';
import { StudentForPage, StudentService } from '../../../../_services/student.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    TablePaginatorComponent,
    MatButtonModule,
    TableSearcherComponent,
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit, AfterViewInit {
  protected dataSource: StudentForPage[] = [];
  protected totalElements!: number;
  protected sizePerPageOptions: number[] = [10, 20, 30];
  protected currentSizePerPage: number = 10;
  protected currentPage: number = 1;
  @ViewChild(TableSearcherComponent, { static: true }) searcher!: TableSearcherComponent;
  @ViewChild(TablePaginatorComponent, { static: true }) paginator!: TablePaginatorComponent;

  constructor(
    private router: Router,
    private readonly studentService: StudentService
  ) {}

  ngOnInit() {
    this.handleApi();
  }

  ngAfterViewInit(): void {
    this.searcher.inputValue.subscribe(input => {
      console.log(input);
      this.handleApi(this.currentSizePerPage, 1, { phrase: input });
    });
    this.searcher.addEmit.subscribe(() => this.add());
    this.paginator.sizePerPage.subscribe(size => {
      console.log(size);
      this.currentSizePerPage = size;
      this.currentPage = 1;
      this.handleApi(size, 1);
    });
    this.paginator.page.subscribe(page => {
      console.log(page);
      this.currentPage = page;
      this.handleApi(this.currentSizePerPage, page);
    });
  }

  protected handleApi(
    size = this.currentSizePerPage,
    page = this.currentPage,
    filters: FilterParams = {}
  ): void {
    this.studentService.getStudents(size, page - 1, 'id', 'ASC', filters).subscribe({
      next: res => {
        console.log(res);
        this.dataSource = res.content;
        this.totalElements = res.totalElements;
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }

  protected add() {
    this.router.navigate(['people', 'student-add']);
  }

  protected open(id: number): void {
    this.router.navigate(['people', 'students', id]);
  }

  protected edit(id: number): void {
    this.router.navigate(['people', 'students', id, 'edit']);
  }
}
