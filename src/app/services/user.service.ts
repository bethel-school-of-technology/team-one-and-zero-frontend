import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL: string = "http://localhost:5167/api/user";
  tokenKey: string = "myCommentToken";
  logged: boolean = false;

  public isLoggedInSubj = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  signUp(newUser: User) {
    return this.http.post(`${this.baseURL}/register`, newUser);
  }

  login(username: string, password: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('username', username);
    queryParams = queryParams.append('password', password);

    return this.http.get(`${this.baseURL}/login`, { params: queryParams, responseType: 'text' })
      .pipe(tap((response: any) => {
        localStorage.setItem('myCommentToken', response);
        this.isLoggedInSubj.next(true);
      }));
  }

  getCurrentUser(): Observable<User> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }

    return this.http.get<User>(`${this.baseURL}/current`, { headers: reqHeaders });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/${username}`);
  }

}

