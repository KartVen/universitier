import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilterParams } from '../shared/models/api';
import { Observable } from 'rxjs';
import Page from '../shared/models/page';
import { BASE_API_URL } from '../app-routing.module';
import { mapParameters } from '../_utils/helpers/functions';
import SelectOption from '../shared/models/select_option';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

interface IProgrammeService {
  getProgrammes(
    size: number,
    page: number,
    sort: string,
    sortDirection: string,
    filterParams: FilterParams
  ): Observable<Page<ProgrammeForPage>>;
  getProgramme(id: number): Observable<ProgrammeView>;
  putProgramme(id: number, data: ProgrammeAddEdit): Observable<void>;
  postProgramme(data: ProgrammeRequest): Observable<SelectOption>;
  getProgrammesSelectable(): Observable<ProgrammeSelectable[]>;
}

@Injectable({
  providedIn: 'root',
})
export class ProgrammeService implements IProgrammeService {
  constructor(private http: HttpClient) {}

  getProgrammes(
    size: number,
    page: number,
    sort: string,
    sortDirection: string,
    filterParams: FilterParams
  ): Observable<Page<ProgrammeForPage>> {
    return this.http.get<Page<ProgrammeForPage>>(`${BASE_API_URL}/api/programmes`, {
      params: mapParameters(size, page, sort, sortDirection, filterParams),
    });
  }

  getProgramme(id: number): Observable<ProgrammeView> {
    return this.http.get<ProgrammeView>(`${BASE_API_URL}/api/programmes/${id}`);
  }

  getProgrammesOptions(): Observable<SelectOption[]> {
    return this.http.get<SelectOption[]>(`${BASE_API_URL}/api/programmes/options`);
  }

  postProgramme(data: ProgrammeRequest): Observable<SelectOption> {
    return this.http.post<SelectOption>(`${BASE_API_URL}/api/programmes`, data, httpOptions);
  }

  putProgramme(id: number, data: ProgrammeAddEdit): Observable<void> {
    return this.http.put<void>(`${BASE_API_URL}/api/programmes/${id}`, data, httpOptions);
  }

  getProgrammesSelectable(): Observable<ProgrammeSelectable[]> {
    return this.http.get<ProgrammeSelectable[]>(`${BASE_API_URL}/api/programmes/selectable`);
  }
}

export interface ProgrammeForPage {
  id: number;
  name: string;
  shortName: string;
  courseName: string;
}

export interface ProgrammeView {
  id: number;
  name: string;
  course: {
    id: number;
    name: string;
  };
  modules: { id: number; name: string }[];
}

export type ProgrammeAddEdit = {
  name: string;
  courseId: number;
};

export type ProgrammeRequest = ProgrammeAddEdit;

export type ProgrammeSelectable = {
  id: number;
  name: string;
  shortName: string;
};
