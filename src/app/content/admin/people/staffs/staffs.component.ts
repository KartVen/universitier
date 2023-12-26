import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TablePaginatorComponent } from '../../../../shared/components/utils/table-paginator/table-paginator.component';
import { StaffService } from '../../../../_services/staff.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TableSearcherComponent } from '../../../../shared/components/utils/table-searcher/table-searcher.component';
import { FilterParams } from '../../../../shared/models/api';

@Component({
  selector: 'app-staffs',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    TablePaginatorComponent,
    MatButtonModule,
    TableSearcherComponent,
  ],
  templateUrl: './staffs.component.html',
  styleUrl: './staffs.component.scss',
})
export class StaffsComponent implements AfterViewInit {
  protected dataSource: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    position: string;
    active: boolean;
  }[] = [];
  protected pageIndex: number = 1;
  protected pageSize: number = 0;
  protected totalElements: number = 0;
  @ViewChild(TableSearcherComponent, { static: true }) searcher!: TableSearcherComponent;
  @ViewChild(TablePaginatorComponent, { static: true }) tableTool!: TablePaginatorComponent;

  constructor(
    private router: Router,
    private readonly peopleService: StaffService
  ) {}

  ngAfterViewInit() {
    this.handleApi();
    this.searcher.inputValue.subscribe(input => {
      this.handleApi(this.pageSize, 1, { phrase: input });
    });
    this.searcher.addEmit.subscribe(() => this.add());
    this.tableTool.sizePerPage.subscribe(pageSize => {
      this.pageSize = pageSize;
      this.pageIndex = 1;
      this.handleApi(pageSize, 1);
    });
    this.tableTool.page.subscribe(pageIndex => {
      this.pageIndex = pageIndex;
      this.handleApi(this.pageSize, pageIndex);
    });
  }

  protected handleApi(
    pageSize = this.pageSize,
    pageIndex = this.pageIndex,
    filters: FilterParams = {}
  ): void {
    this.dataSource = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Nowak',
        email: 'jnowak@universitier.edu.pl',
        role: 'STAFF',
        position: 'Stanowisko 1',
        active: true,
      },
      {
        id: 1,
        firstName: 'John',
        lastName: 'Nowak',
        email: 'jnowak@universitier.edu.pl',
        role: 'STAFF',
        position: 'Stanowisko 1',
        active: true,
      },
      {
        id: 1,
        firstName: 'John',
        lastName: 'Nowak',
        email: 'jnowak@universitier.edu.pl',
        role: 'STAFF',
        position: 'Stanowisko 1',
        active: true,
      },
      {
        id: 1,
        firstName: 'John',
        lastName: 'Nowak',
        email: 'jnowak@universitier.edu.pl',
        role: 'STAFF',
        position: 'Stanowisko 1',
        active: true,
      },
      {
        id: 1,
        firstName: 'John',
        lastName: 'Nowak',
        email: 'jnowak@universitier.edu.pl',
        role: 'STAFF',
        position: 'Stanowisko 1',
        active: true,
      },
    ];
    this.totalElements = this.dataSource.length;
  }

  protected add() {
    this.router.navigate(['people', 'staff-add']);
  }

  protected open(id: number): void {
    this.router.navigate(['people', 'staffs', id]);
  }

  protected edit(id: number): void {
    this.router.navigate(['people', 'staffs', id, 'edit']);
  }
}
