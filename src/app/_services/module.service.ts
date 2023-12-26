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

interface IModuleService {
  getModules(
    size: number,
    page: number,
    sort: string,
    sortDirection: string,
    filterParams: FilterParams
  ): Observable<Page<Module>>;
  getModule(id: number): Observable<ModuleDetails>;
  getModulesOptions(): Observable<SelectOption[]>;
  putModule(id: number, data: ModuleEdit): Observable<void>;
  postModule(data: ModuleRequest): Observable<SelectOption>;
}

@Injectable({
  providedIn: 'root',
})
export class ModuleService implements IModuleService {
  constructor(private http: HttpClient) {}

  getModules(
    size: number,
    page: number,
    sort: string,
    sortDirection: string,
    filterParams: FilterParams
  ): Observable<Page<Module>> {
    return this.http.get<Page<Module>>(`${BASE_API_URL}/api/modules`, {
      params: mapParameters(size, page, sort, sortDirection, filterParams),
    });
  }

  getModule(id: number): Observable<ModuleDetails> {
    return this.http.get<ModuleDetails>(`${BASE_API_URL}/api/modules/${id}`);
  }

  getModulesOptions(): Observable<SelectOption[]> {
    return this.http.get<SelectOption[]>(`${BASE_API_URL}/api/modules/options`);
  }

  postModule(data: ModuleRequest): Observable<SelectOption> {
    return this.http.post<SelectOption>(`${BASE_API_URL}/api/modules`, data, httpOptions);
  }

  putModule(id: number, data: ModuleEdit): Observable<void> {
    return this.http.put<void>(`${BASE_API_URL}/api/modules/${id}`, data, httpOptions);
  }
}

export type Module = {
  id: number;
  name: string;
  hours: number;
  ects: number;
  is_exam: boolean;
};

export type ModuleDetails = {
  id: number;
  name: string;
  hours: number;
  ects: number;
  is_exam: boolean;
  programme: {
    id: number;
    name: string;
  };
  classTypes: string[];
};

export type ModuleEdit = {
  id: number;
  name: string;
  hours: number;
  ects: number;
  is_exam: boolean;
  programme_id: number;
};

export type ModuleRequest = ModuleEdit;
