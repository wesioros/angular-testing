import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dog } from './../models/app.models';
@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  constructor(private http: HttpClient) {


  }



  getDog(): Observable<Dog> {
    const url = 'https://dog.ceo/api/breeds/image/random';
    return this.http.get<Dog>(url);
  }
}
