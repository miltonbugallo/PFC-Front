import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = '/login';
  private token:  string | null = null;
  constructor(private http: HttpClient, private router: Router) {}

  login(user: string, pass: string): Observable<any> {
    const loginData = {
      email: user,
      password: pass
    };
    return this.http.post(this.apiUrl, loginData);
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('auth_token', token);

    setTimeout(() => {
      this.deleteToken();
      this.router.navigate(['/login']);
    }, 10000);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('auth_token');
  }

  deleteToken(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}


