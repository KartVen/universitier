import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SearchInputComponent } from '../shared/components/search-input/search-input.component';
import { ApiFilters } from '../shared/models/api';

@Component({
  template: '',
})
abstract class CardTableComponent<T> implements AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(SearchInputComponent, { static: true })
  searchInput!: SearchInputComponent;

  abstract displayedColumns: string[];
  pageSizeOptions = [10, 20, 50];
  dataSource = new MatTableDataSource<T>();
  totalElements: number | null = null;
  filtersState: ApiFilters = {
    sortField: 'id',
    sortDirection: 'ASC',
    filterParams: {
      phrase: undefined,
    },
  };

  protected constructor() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.handleLoadData(this.paginator.pageSize, this.paginator.pageIndex);
    this.paginator.page.subscribe(event => {
      this.handleLoadData(event.pageSize, event.pageIndex);
    });
    this.sort.sortChange.subscribe(sortState => {
      console.log(sortState);
      this.filtersState.sortField = sortState.active;
      this.filtersState.sortDirection = sortState.direction === 'asc' ? 'ASC' : 'DESC';
      this.handleLoadData(this.paginator.pageSize, this.paginator.pageIndex);
    });
    this.searchInput.value.subscribe(value => {
      this.filtersState.filterParams.phrase = value;
      this.handleLoadData(this.paginator.pageSize, this.paginator.pageIndex);
    });
  }

  protected abstract handleLoadData(pageSize: number, pageIndex: number): void;

  protected abstract openRecord(id: number): void;
  protected abstract editRecord(id: number): void;
  protected abstract addRecord(): void;
}

export default CardTableComponent;
