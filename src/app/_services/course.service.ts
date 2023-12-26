import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilterParams } from '../shared/models/api';
import { Observable } from 'rxjs';
import Page from '../shared/models/page';
import { mapParameters } from '../_utils/helpers/functions';
import { BASE_API_URL } from '../app-routing.module';
import SelectOption from '../shared/models/select_option';

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
  getCoursesOptions(): Observable<SelectOption[]>;
  putCourse(id: number, data: CourseAddEdit): Observable<void>;
  postCourse(data: CourseRequest): Observable<SelectOption>;
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
      params: mapParameters(size, page, sort, sortDirection, filterParams),
    });
  }

  getCourse(id: number): Observable<CourseView> {
    return this.http.get<CourseView>(`${BASE_API_URL}/api/courses/${id}`);
  }

  getCoursesOptions(): Observable<SelectOption[]> {
    return this.http.get<SelectOption[]>(`${BASE_API_URL}/api/courses/options`);
  }

  postCourse(data: CourseRequest): Observable<SelectOption> {
    return this.http.post<SelectOption>(`${BASE_API_URL}/api/courses`, data, httpOptions);
  }

  putCourse(id: number, data: CourseAddEdit): Observable<void> {
    return this.http.put<void>(`${BASE_API_URL}/api/courses/${id}`, data, httpOptions);
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
  academicYears: {
    id: number;
    academicYear: string;
  }[];
}

export type CourseAddEdit = {
  name: string;
  facultyId: number;
  academicYearsIds: number[];
};

export type CourseRequest = CourseAddEdit;
