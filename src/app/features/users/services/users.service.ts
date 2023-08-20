import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, filter, map, take, tap, throwError } from 'rxjs';
import { IFoundUser, IRepos, IUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly apiUrl = 'https://api.github.com';

  constructor(
    private readonly http: HttpClient
  ) {}

  public getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}/users`);
  }

  public getUsersByUsername(username: string): Observable<IUser[] | null> {
    return this.http.get<IFoundUser>(`${this.apiUrl}/search/users?q=${username}`)
      .pipe(
        map((data) => data?.items),
        catchError((error: HttpErrorResponse) => throwError(error))
      );
  }

  public getReposByUsername(username: string): Observable<IRepos[]> {
    return this.http.get<IRepos[]>(`${this.apiUrl}/users/${username}/repos`);
  }
}
