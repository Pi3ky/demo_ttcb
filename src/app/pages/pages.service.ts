import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { urlApi } from '../common/const';
@Injectable({
  providedIn: 'root'
})
export class PagesService {
  public listProducts: any[] = [];
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(`${urlApi}/products`);
  }

  filterCategory(param: any): Observable<any> {
    return this.http.get(`${urlApi}/products/category/${param}`)
  }

  getCategories(): Observable<any> {
    return this.http.get(`${urlApi}/products/categories`)
  }

  getUserCart(id: any): Observable<any>{
    return this.http.get(`${urlApi}/carts/user/${id}`)
  }
}
