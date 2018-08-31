import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from './user';
import { Observable } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://teradix.herokuapp.com';
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }


  constructor(private http: HttpClient) {
  }

  getToken() {
    return localStorage.getItem('token');
  }

  register(user: User): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>(`${this.baseUrl}/api/users/register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  logIn(email: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<Object>>(`${this.baseUrl}/api/users/login`, { email, password }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  logOut() {
    return this.http.delete<any>(`${this.baseUrl}/api/users/logout`);
  }
}
