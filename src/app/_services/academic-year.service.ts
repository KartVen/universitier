import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilterParams } from '../shared/models/api';
import { Observable } from 'rxjs';
import Page from '../shared/models/page';
import { BASE_API_URL } from '../app-routing.module';
import SelectOption from '../shared/models/select_option';
import { mapParameters } from '../_utils/helpers/functions';

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
  getAcademicYearsOptions(): Observable<SelectOption[]>;
  putAcademicYear(id: number, data: AcademicYearEdit): Observable<void>;
  postAcademicYear(data: AcademicYearRequest): Observable<SelectOption>;
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
      params: mapParameters(size, page, sort, sortDirection, filterParams),
    });
  }

  getAcademicYear(id: number): Observable<AcademicYearView> {
    return this.http.get<AcademicYearView>(`${BASE_API_URL}/api/academic-years/${id}`);
  }

  putAcademicYear(id: number, data: AcademicYearEdit): Observable<void> {
    console.log(data);
    return this.http.put<void>(`${BASE_API_URL}/api/academic-years/${id}`, data, httpOptions);
  }

  getAcademicYearsOptions(): Observable<SelectOption[]> {
    return this.http.get<SelectOption[]>(`${BASE_API_URL}/api/academic-years/options`);
  }

  postAcademicYear(data: AcademicYearRequest): Observable<SelectOption> {
    return this.http.post<SelectOption>(`${BASE_API_URL}/api/academic-years`, data, httpOptions);
  }
}

export type AcademicYearForPage = {
  id: number;
  number: number;
  academicYear: string;
};

export type AcademicYearView = AcademicYearForPage;

export type AcademicYearEdit = {
  number: number;
  academicYear: string;
};

export type AcademicYearRequest = AcademicYearEdit;
