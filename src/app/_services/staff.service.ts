import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

interface IStaffService {
  /*postStaffs(data: StaffRequest): Observable<SelectOption>;*/
}

@Injectable({
  providedIn: 'root',
})
export class StaffService implements IStaffService {
  constructor(private http: HttpClient) {}

  /*  postStaffs(data: StaffRequest): Observable<SelectOption> {
    return this.http.post<SelectOption>(`${BASE_API_URL}/api/staffs`, data, httpOptions);
  }*/
}

export type StaffView = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  position: string | null;
  description: string;
  active: boolean;
};
