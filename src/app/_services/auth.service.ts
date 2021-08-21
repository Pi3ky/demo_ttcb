import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { urlApi } from '../common/const';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public _USER_KEY: any = 'currentUser';
  private currentUserSubject!: BehaviorSubject<any>;
  public currentUser!: Observable<any>;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {
    const user = localStorage.getItem(this._USER_KEY)
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(user!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  createSession(body: any): Observable<any>{
    return this.http.post(`${urlApi}/auth/login`, body).pipe(
      map(res => {
        localStorage.setItem(this._USER_KEY, JSON.stringify(res));
        this.currentUserSubject.next(res);
      })
    );
  }

  logout() {
    localStorage.removeItem(this._USER_KEY);
    sessionStorage.removeItem('selected');
    this.currentUserSubject.next(null);
  }
}
