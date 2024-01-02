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

interface IAcademicYearService {
  getAcademicYears(
    size: number,
    page: number,
    sort: string,
    sortDirection: string,
    filterParams: FilterParams
  ): Observable<Page<AcademicYearForPage>>;
  getAcademicYear(id: number): Observable<AcademicYearView>;
  putAcademicYear(id: number, data: AcademicYearEdit): Observable<void>;
  postAcademicYear(data: AcademicYearRequest): Observable<AcademicYearSelectable>;
  getAcademicYearsSelectable(): Observable<AcademicYearSelectable[]>;
}

@Injectable({
  providedIn: 'root',
})
export class AcademicYearService implements IAcademicYearService {
  constructor(private http: HttpClient) {}

  getAcademicYears(
    size: number,
    page: number,
    sort: string,
    sortDirection: string,
    filterParams: FilterParams
  ): Observable<Page<AcademicYearForPage>> {
    return this.http.get<Page<AcademicYearForPage>>(`${BASE_API_URL}/api/academic-years`, {
      params: mapParams(size, page, sort, sortDirection, filterParams),
    });
  }

  getAcademicYear(id: number): Observable<AcademicYearView> {
    return this.http.get<AcademicYearView>(`${BASE_API_URL}/api/academic-years/${id}`);
  }

  putAcademicYear(id: number, data: AcademicYearEdit): Observable<void> {
    console.log(data);
    return this.http.put<void>(`${BASE_API_URL}/api/academic-years/${id}`, data, httpOptions);
  }

  postAcademicYear(data: AcademicYearRequest): Observable<AcademicYearSelectable> {
    return this.http.post<AcademicYearSelectable>(
      `${BASE_API_URL}/api/academic-years`,
      data,
      httpOptions
    );
  }

  getAcademicYearsSelectable(): Observable<AcademicYearSelectable[]> {
    return this.http.get<AcademicYearSelectable[]>(`${BASE_API_URL}/api/academic-years/selectable`);
  }
}

export type AcademicYearForPage = {
  id: number;
  semesters: number;
  range: string;
};

export type AcademicYearView = AcademicYearForPage;

export type AcademicYearEdit = {
  number: number;
  academicYear: string;
};

export type AcademicYearRequest = AcademicYearEdit;

export type AcademicYearSelectable = {
  id: number;
  range: string;
};
