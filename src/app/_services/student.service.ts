import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilterParams } from '../shared/models/api';
import { Observable } from 'rxjs';
import Page from '../shared/models/page';
import { BASE_API_URL } from '../app-routing.module';
import { mapParameters } from '../_utils/helpers/functions';

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
  /*postStudents(data: StudentRequest): Observable<SelectOption>;*/
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
      params: mapParameters(size, page, sort, sortDirection, filterParams),
    });
  }

  /*  postStudents(data: StudentRequest): Observable<SelectOption> {
    return this.http.post<SelectOption>(`${BASE_API_URL}/api/staffs`, data, httpOptions);
  }*/
}

export type StudentForPage = {
  id: number;
  firstName: string;
  lastName: string;
  email: null;
  active: boolean;
};

export type StudentView = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  position: string | null;
  description: string;
  active: boolean;
};
