import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { urlApi } from '../common/const';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: "root",
})
export class PagesService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(`${urlApi}/products`);
  }

  getShoppingCart(): Observable<any>{
    const bag = JSON.parse(sessionStorage.getItem('selected'));
    if(bag && bag.length){
      return of(bag).pipe(delay(100))
    } else {
      return throwError("Your cart is empty")
    }
  }

  filterCategory(param: any): Observable<any> {
    return this.http.get<any>(`${urlApi}/products`, {params: param})
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${urlApi}/categories`);
  }

  createBooking(param): Observable<any> {
    return this.http.post<any>(`${urlApi}/orders`, param);
  }

}
