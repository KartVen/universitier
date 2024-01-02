import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilterParams } from '../shared/models/api';
import { Observable } from 'rxjs';
import Page from '../shared/models/page';
import { BASE_API_URL } from '../app-routing.module';
import { mapParams } from '../_utils/helpers/functions';
import Selectable from '../shared/models/selectable';

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
  postFaculty(data: FacultyRequest): Observable<Selectable>;
  getFacultiesSelectable(): Observable<FacultySelectable[]>;
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
      params: mapParams(size, page, sort, sortDirection, filterParams),
    });
  }

  getFaculty(id: number): Observable<FacultyView> {
    return this.http.get<FacultyView>(`${BASE_API_URL}/api/faculties/${id}`);
  }

  putFaculty(id: number, data: FacultyEdit): Observable<void> {
    return this.http.put<void>(`${BASE_API_URL}/api/faculties/${id}`, data, httpOptions);
  }

  postFaculty(data: FacultyRequest): Observable<Selectable> {
    return this.http.post<Selectable>(`${BASE_API_URL}/api/faculties`, data, httpOptions);
  }

  getFacultiesSelectable(): Observable<FacultySelectable[]> {
    return this.http.get<FacultySelectable[]>(`${BASE_API_URL}/api/faculties/selectable`);
  }
}

export type FacultyForPage = {
  id: number;
  name: string;
  shortName: string;
  address: string;
};

export type FacultyView = FacultyForPage & {
  yearFounded: number;
  courses: { id: number; name: string }[];
};

export type FacultyEdit = {
  name: string;
  shortName: string;
  address: string;
  yearFounded: number;
};

export type FacultyRequest = FacultyEdit;

export type FacultySelectable = Selectable & {
  shortName: string;
};
