import { Injectable } from '@angular/core';
import Auth from '../shared/models/auth';
import { jwtDecode } from 'jwt-decode';

const AUTH_ITEM_KEY = 'USESSION';

@Injectable({
  providedIn: 'root',
})
export class BrowserService {
  private browser: Storage;

  constructor() {
    this.browser = window.sessionStorage;
  }

  isLoggedIn() {
    return !!this.browser.getItem(AUTH_ITEM_KEY);
  }

  save(auth: Auth) {
    this.browser.removeItem(AUTH_ITEM_KEY);
    this.browser.setItem(AUTH_ITEM_KEY, auth.bearer);
  }

  clean(): void {
    window.sessionStorage.clear();
  }

  get(): Jwt | null {
    const token = this.browser.getItem(AUTH_ITEM_KEY);
    return token ? jwtDecode(token) : null;
  }
}

export interface Jwt {
  id: number;
  username: string;
  authorities: string[];
  iat: number;
  exp: number;
}
