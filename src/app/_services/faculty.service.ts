import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilterParams } from '../shared/models/api';
import { Observable } from 'rxjs';
import Page from '../shared/models/page';
import SelectOption from '../shared/models/select_option';
import { BASE_API_URL } from '../app-routing.module';
import { mapParameters } from '../_utils/helpers/functions';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

interface IFacultyService {
  getFaculties(
    size: number,
    page: number,
    sort: string,
    sortDirection: string,
    filterParams: FilterParams
  ): Observable<Page<FacultyForPage>>;
  getFaculty(id: number): Observable<FacultyView>;
  putFaculty(id: number, data: FacultyEdit): Observable<void>;
  getFacultiesSelectable(): Observable<SelectOption[]>;
  postFaculty(data: FacultyRequest): Observable<SelectOption>;
}

@Injectable({
  providedIn: 'root',
})
export class FacultyService implements IFacultyService {
  constructor(private http: HttpClient) {}

  getFaculties(
    size: number,
    page: number,
    sort: string,
    sortDirection: string,
    filterParams: FilterParams
  ): Observable<Page<FacultyForPage>> {
    return this.http.get<Page<FacultyForPage>>(`${BASE_API_URL}/api/faculties`, {
      params: mapParameters(size, page, sort, sortDirection, filterParams),
    });
  }

  getFaculty(id: number): Observable<FacultyView> {
    return this.http.get<FacultyView>(`${BASE_API_URL}/api/faculties/${id}`);
  }

  putFaculty(id: number, data: FacultyEdit): Observable<void> {
    return this.http.put<void>(`${BASE_API_URL}/api/faculties/${id}`, data, httpOptions);
  }

  getFacultiesSelectable(): Observable<FacultySelectable[]> {
    return this.http.get<FacultySelectable[]>(`${BASE_API_URL}/api/faculties/selectable`);
  }

  postFaculty(data: FacultyRequest): Observable<SelectOption> {
    return this.http.post<SelectOption>(`${BASE_API_URL}/api/faculties`, data, httpOptions);
  }
}

export type FacultyForPage = {
  id: number;
  name: string;
  shortName: string;
  address: string;
};

export type FacultyView = FacultyForPage & {
  courses: number;
};

export type FacultyEdit = {
  name: string;
  shortName: string;
  address: string;
};

export type FacultyRequest = FacultyEdit;

export type FacultySelectable = {
  id: number;
  name: string;
  shortName: string;
};
