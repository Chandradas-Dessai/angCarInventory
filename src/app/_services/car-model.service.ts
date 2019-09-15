import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { Manufacturer } from '../_models/manufacturer.model';
import { Model } from '../_models/model.model';

@Injectable({
  providedIn: 'root'
})
export class CarModelService {

  
  //url: string = 'http://127.0.0.1:8000/api/v1/car-model';
  //url: string = 'http://cinventory.000webhostapp.com/api/v1/car-model';
  //url: string = 'https://cinventory.000webhostapp.com/v1/car-model';
  url: string = 'https://laravelbackend.herokuapp.com/api/v1/car-model';

  constructor(private http: HttpClient) { }

  
  getAllCarModels(): Observable<Model>{
    return this.http.get<Model>(this.url);
  }

  createCarModel(input: any): Observable<any>{
    return this.http.post<any>(this.url, input).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  
}
