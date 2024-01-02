import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilterParams } from '../shared/models/api';
import { Observable } from 'rxjs';
import Page from '../shared/models/page';
import { BASE_API_URL } from '../app-routing.module';
import { mapParams } from '../_utils/helpers/functions';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

interface IStudentService {
  getStudents(
    size: number,
    page: number,
    sort: string,
    sortDirection: string,
    filterParams: FilterParams
  ): Observable<Page<StudentForPage>>;
  getStudent(id: number): Observable<StudentView>;
  // putFaculty(id: number, data: FacultyEdit): Observable<void>;
  // postFaculty(data: FacultyRequest): Observable<Selectable>;
  // getFacultiesSelectable(): Observable<FacultySelectable[]>;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService implements IStudentService {
  constructor(private http: HttpClient) {}

  getStudents(
    size: number,
    page: number,
    sort: string,
    sortDirection: string,
    filterParams: FilterParams
  ): Observable<Page<StudentForPage>> {
    return this.http.get<Page<StudentForPage>>(`${BASE_API_URL}/api/students`, {
      params: mapParams(size, page, sort, sortDirection, filterParams),
    });
  }

  getStudent(id: number): Observable<StudentView> {
    return this.http.get<StudentView>(`${BASE_API_URL}/api/students/${id}`);
  }
}

export type StudentForPage = {
  id: number;
  firstName: string;
  lastName: string;
  email: null;
  coursesCount: number;
  isActive: boolean;
};

export type StudentView = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  courses: [];
};
