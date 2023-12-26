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
  ): Observable<Page<Programme>>;
  getProgramme(id: number): Observable<ProgrammeDetails>;
  getProgrammesOptions(): Observable<SelectOption[]>;
  putProgramme(id: number, data: ProgrammeEdit): Observable<void>;
  postProgramme(data: ProgrammeRequest): Observable<SelectOption>;
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
  ): Observable<Page<Programme>> {
    return this.http.get<Page<Programme>>(`${BASE_API_URL}/api/programmes`, {
      params: mapParameters(size, page, sort, sortDirection, filterParams),
    });
  }

  getProgramme(id: number): Observable<ProgrammeDetails> {
    return this.http.get<ProgrammeDetails>(`${BASE_API_URL}/api/programmes/${id}`);
  }

  getProgrammesOptions(): Observable<SelectOption[]> {
    return this.http.get<SelectOption[]>(`${BASE_API_URL}/api/programmes/options`);
  }

  postProgramme(data: ProgrammeRequest): Observable<SelectOption> {
    return this.http.post<SelectOption>(`${BASE_API_URL}/api/programmes`, data, httpOptions);
  }

  putProgramme(id: number, data: ProgrammeEdit): Observable<void> {
    return this.http.put<void>(`${BASE_API_URL}/api/programmes/${id}`, data, httpOptions);
  }
}

export interface Programme {
  id: number;
  name: string;
}

export interface ProgrammeDetails {
  id: number;
  name: string;
  course: {
    id: number;
    name: string;
  };
  modules: number;
}

export type ProgrammeEdit = {
  name: string;
};

export type ProgrammeRequest = ProgrammeEdit;
