import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:250/api';
  private token:  string | null = null;

  constructor(private http: HttpClient) {}

  loginFalso(user: string, pass: string): Observable<any> {
    const fakeResponse = {
      user: user,
      token: ['123456','987654']
    };
    return of(fakeResponse);
  }
  

  login(user: string, pass: string): Observable<any> {
    const loginData = {
      email: user,
      password: pass
    };
    return this.http.post(`${this.apiUrl}/login`, JSON.stringify(loginData));
  }

  setToken(token: string | null): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  deleteToken() {
    this.token = null;
  }

}
