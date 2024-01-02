import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TablePaginatorComponent } from '../../../../shared/components/utils/table-paginator/table-paginator.component';
import { TableSearcherComponent } from '../../../../shared/components/utils/table-searcher/table-searcher.component';
import { Router } from '@angular/router';
import { FilterParams } from '../../../../shared/models/api';
import { HttpErrorResponse } from '@angular/common/http';
import { GroupForPage, GroupService } from '../../../../_services/group.service';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    TablePaginatorComponent,
    TableSearcherComponent,
  ],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss',
})
export class GroupsComponent implements AfterViewInit {
  protected dataSource: GroupForPage[] = [];
  protected totalElements!: number;
  protected sizePerPageOptions: number[] = [10, 20, 30];
  protected currentSizePerPage: number = 10;
  protected currentPage: number = 1;
  @ViewChild(TableSearcherComponent, { static: true }) searcher!: TableSearcherComponent;
  @ViewChild(TablePaginatorComponent, { static: true }) paginator!: TablePaginatorComponent;

  constructor(
    private router: Router,
    private readonly groupService: GroupService
  ) {}

  ngAfterViewInit(): void {
    this.handleApi();
    this.searcher.inputValue.subscribe(input => {
      this.handleApi(this.currentSizePerPage, 1, { phrase: input });
    });
    this.searcher.addEmit.subscribe(() => this.add());
    this.paginator.sizePerPage.subscribe(size => {
      this.currentSizePerPage = size;
      this.currentPage = 1;
      this.handleApi(size, 1);
    });
    this.paginator.page.subscribe(page => {
      this.currentPage = page;
      this.handleApi(this.currentSizePerPage, page);
    });
  }

  protected handleApi(
    size = this.currentSizePerPage,
    page = this.currentPage,
    filters: FilterParams = {}
  ): void {
    this.groupService.getGroups(size, page - 1, 'id', 'ASC', filters).subscribe({
      next: res => {
        this.dataSource = res.content;
        this.totalElements = res.totalElements;
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }

  protected add() {
    this.router.navigate(['university', 'group-add']);
  }

  protected edit(id: number): void {
    this.router.navigate(['university', 'groups', id, 'edit']);
  }
}
