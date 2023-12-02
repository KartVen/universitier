import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Page<T> = {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
};

export type Pageable = {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
};

export type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type Student = {
  id: number;
  firstName: string;
  lastName: string;
  active: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private baseURL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getStudents(
    size: number,
    page: number,
    sort: string,
    sortDirection: 'ASC' | 'DESC'
  ): Observable<Page<Student>> {
    const params = new HttpParams()
      .set('size', size.toString())
      .set('page', page.toString())
      .set('sort', sort)
      .set('sort_direction', sortDirection);

    return this.http.get<Page<Student>>(`${this.baseURL}/api/students`, {
      params,
    });
  }

  getStaffs(
    size: number,
    page: number,
    sort: string,
    sortDirection: 'ASC' | 'DESC'
  ) {
    return this.getStudents(size, page, sort, sortDirection);
  }
}
