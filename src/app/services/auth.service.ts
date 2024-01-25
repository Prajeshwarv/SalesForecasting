import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
const AUTH_API = 'http://localhost:5000/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

export interface ResponseObject {
  email: string;
  token: any;
  statusCode: string;
  statusMessage: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  error: any;
  response: ResponseObject | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  isUserVerified(email: string, password: string) {
    let url = AUTH_API + 'signin?email=' + email + '&password=' + password;
    return this.http.get<ResponseObject>(url);
  }

  signup(userData: any) {
    let url = AUTH_API + 'register-user';
    return this.http.post<ResponseObject>(url, userData)
  }

  signin(email: string, password: string) {
    return this.isUserVerified(email, password)
  }

  isSignedIn() {
    if (localStorage.getItem('auth-token') !== null) return true;
    else return false;
  }

  signout(): void {
    localStorage.removeItem('auth-token');
    this.router.navigate(['/']);
  }
}
