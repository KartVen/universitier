import { Injectable } from '@angular/core';
import Auth from '../shared/models/api/auth';

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
}
