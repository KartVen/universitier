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

interface IConnectionService {
  getConnections(
    size: number,
    page: number,
    sort: string,
    sortDirection: string,
    filterParams: FilterParams
  ): Observable<Page<ConnectionForPage>>;
  getConnection(id: number): Observable<ConnectionView>;
  putConnection(id: number, data: ConnectionAddEdit): Observable<void>;
  postConnection(data: ConnectionRequest): Observable<Selectable>;
}

@Injectable({
  providedIn: 'root',
})
export class ConnectionService implements IConnectionService {
  constructor(private http: HttpClient) {}

  getConnections(
    size: number,
    page: number,
    sort: string,
    sortDirection: string,
    filterParams: FilterParams
  ): Observable<Page<ConnectionForPage>> {
    return this.http.get<Page<ConnectionForPage>>(`${BASE_API_URL}/api/connections`, {
      params: mapParams(size, page, sort, sortDirection, filterParams),
    });
  }

  getConnection(id: number): Observable<ConnectionView> {
    return this.http.get<ConnectionView>(`${BASE_API_URL}/api/connections/${id}`);
  }

  putConnection(id: number, data: ConnectionAddEdit): Observable<void> {
    return this.http.put<void>(`${BASE_API_URL}/api/connections/${id}`, data, httpOptions);
  }

  postConnection(data: ConnectionRequest): Observable<Selectable> {
    return this.http.post<Selectable>(`${BASE_API_URL}/api/connections`, data, httpOptions);
  }
}

export type ConnectionForPage = {
  id: number;
  moduleName: string;
  academicYearRange: string;
  groupName: string;
};

export type ConnectionView = {
  id: number;
  module: { id: number; name: string };
  academicYear: { id: number; range: string };
  groups: { id: number; type: string; number: number }[];
};

export type ConnectionAddEdit = {
  moduleId: number;
  academicYearId: number;
  groupsIds: number[];
};

export type ConnectionRequest = ConnectionAddEdit;
