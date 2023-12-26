import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Auth from '../shared/models/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(loginRequest: { email: string; password: string }) {
    return this.httpClient.post<Auth>(
      'http://localhost:8080/api/auth/login',
      loginRequest,
      httpOptions
    );
  }
}
