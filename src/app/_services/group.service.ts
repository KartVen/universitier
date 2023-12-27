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

interface IGroupService {
  getGroups(
    size: number,
    page: number,
    sort: string,
    sortDirection: string,
    filterParams: FilterParams
  ): Observable<Page<GroupForPage>>;
  getGroup(id: number): Observable<GroupView>;
  putGroup(id: number, data: GroupAddEdit): Observable<void>;
  postGroup(data: GroupRequest): Observable<SelectOption>;
  getGroupsSelectable(): Observable<GroupSelectable[]>;
}

@Injectable({
  providedIn: 'root',
})
export class GroupService implements IGroupService {
  constructor(private http: HttpClient) {}

  getGroups(
    size: number,
    page: number,
    sort: string,
    sortDirection: string,
    filterParams: FilterParams
  ): Observable<Page<GroupForPage>> {
    return this.http.get<Page<GroupForPage>>(`${BASE_API_URL}/api/groups`, {
      params: mapParameters(size, page, sort, sortDirection, filterParams),
    });
  }

  getGroup(id: number): Observable<GroupView> {
    return this.http.get<GroupView>(`${BASE_API_URL}/api/groups/${id}`);
  }

  putGroup(id: number, data: GroupAddEdit): Observable<void> {
    return this.http.put<void>(`${BASE_API_URL}/api/groups/${id}`, data, httpOptions);
  }

  postGroup(data: GroupRequest): Observable<SelectOption> {
    return this.http.post<SelectOption>(`${BASE_API_URL}/api/groups`, data, httpOptions);
  }

  getGroupsSelectable(): Observable<GroupSelectable[]> {
    return this.http.get<GroupSelectable[]>(`${BASE_API_URL}/api/groups/selectable`);
  }
}

export type GroupForPage = {
  id: number;
  number: number;
  type: string;
};

export type GroupView = GroupForPage;

export type GroupAddEdit = {
  number: number;
  type: string;
};

export type GroupRequest = GroupAddEdit;

export type GroupSelectable = {
  id: number;
  number: number;
  type: string;
};
