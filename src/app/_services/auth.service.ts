import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_API_URL } from '../app-routing.module';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

interface IAuthService {
  login(loginRequest: Login): Observable<Auth>;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  constructor(private httpClient: HttpClient) {}

  login(loginRequest: Login): Observable<Auth> {
    return this.httpClient.post<Auth>(`${BASE_API_URL}/api/auth/login`, loginRequest, httpOptions);
  }
}

export type Login = { usernameOrEmail: string; password: string };

export type Auth = {
  id: number;
  token: string;
};
