import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilterParams } from '../shared/models/api';
import { Observable } from 'rxjs';
import Page from '../shared/models/page';
import { mapParams } from '../_utils/helpers/functions';
import { BASE_API_URL } from '../app-routing.module';
import Selectable from '../shared/models/selectable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

interface ICourseService {
  getCourses(
    size: number,
    page: number,
    sort: string,
    sortDirection: string,
    filterParams: FilterParams
  ): Observable<Page<CourseForPage>>;
  getCourse(id: number): Observable<CourseView>;
  putCourse(id: number, data: CourseAddEdit): Observable<void>;
  postCourse(data: CourseRequest): Observable<Selectable>;
  getCoursesSelectable(): Observable<CourseSelectable[]>;
}

@Injectable({
  providedIn: 'root',
})
export class CourseService implements ICourseService {
  constructor(private http: HttpClient) {}

  getCourses(
    size: number,
    page: number,
    sort: string,
    sortDirection: string,
    filterParams: FilterParams
  ): Observable<Page<CourseForPage>> {
    return this.http.get<Page<CourseForPage>>(`${BASE_API_URL}/api/courses`, {
      params: mapParams(size, page, sort, sortDirection, filterParams),
    });
  }

  getCourse(id: number): Observable<CourseView> {
    return this.http.get<CourseView>(`${BASE_API_URL}/api/courses/${id}`);
  }

  postCourse(data: CourseRequest): Observable<Selectable> {
    return this.http.post<Selectable>(`${BASE_API_URL}/api/courses`, data, httpOptions);
  }

  putCourse(id: number, data: CourseAddEdit): Observable<void> {
    return this.http.put<void>(`${BASE_API_URL}/api/courses/${id}`, data, httpOptions);
  }

  getCoursesSelectable(): Observable<CourseSelectable[]> {
    return this.http.get<CourseSelectable[]>(`${BASE_API_URL}/api/courses/selectable`);
  }
}

export type CourseForPage = {
  id: number;
  name: string;
  facultyShortName: string;
};

export interface CourseView {
  id: number;
  name: string;
  faculty: {
    id: number;
    name: string;
  };
  programmes: { id: number; name: string; shortname: string }[];
}

export type CourseAddEdit = {
  name: string;
  facultyId: number;
};

export type CourseRequest = CourseAddEdit;

export type CourseSelectable = {
  id: number;
  name: string;
};
