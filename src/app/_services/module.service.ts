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
  ): Observable<Page<ModuleForPage>>;
  getModule(id: number): Observable<ModuleView>;
  putModule(id: number, data: ModuleAddEdit): Observable<void>;
  postModule(data: ModuleRequest): Observable<SelectOption>;
  getModulesSelectable(): Observable<ModuleSelectable[]>;
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
  ): Observable<Page<ModuleForPage>> {
    return this.http.get<Page<ModuleForPage>>(`${BASE_API_URL}/api/modules`, {
      params: mapParameters(size, page, sort, sortDirection, filterParams),
    });
  }

  getModule(id: number): Observable<ModuleView> {
    return this.http.get<ModuleView>(`${BASE_API_URL}/api/modules/${id}`);
  }

  getModulesOptions(): Observable<SelectOption[]> {
    return this.http.get<SelectOption[]>(`${BASE_API_URL}/api/modules/options`);
  }

  postModule(data: ModuleRequest): Observable<SelectOption> {
    return this.http.post<SelectOption>(`${BASE_API_URL}/api/modules`, data, httpOptions);
  }

  putModule(id: number, data: ModuleAddEdit): Observable<void> {
    return this.http.put<void>(`${BASE_API_URL}/api/modules/${id}`, data, httpOptions);
  }

  getModulesSelectable(): Observable<ModuleSelectable[]> {
    return this.http.get<ModuleSelectable[]>(`${BASE_API_URL}/api/modules/selectable`);
  }
}

export type ModuleForPage = {
  id: number;
  name: string;
  hours: number;
  ects: number;
  isExam: boolean;
  programmeName: string;
};

export type ModuleView = {
  id: number;
  name: string;
  hours: number;
  ects: number;
  isExam: boolean;
  programme: {
    id: number;
    name: string;
  };
};

export type ModuleAddEdit = {
  name: string;
  hours: number;
  ects: number;
  isExam: boolean;
  programmeId: number;
};

export type ModuleRequest = ModuleAddEdit;

export type ModuleSelectable = {
  id: number;
  name: string;
};
