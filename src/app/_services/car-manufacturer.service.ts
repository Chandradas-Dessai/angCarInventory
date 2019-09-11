import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { Manufacturer } from '../_models/manufacturer.model';

@Injectable({
  providedIn: 'root'
})
export class CarManufacturerService {

  //url: string = 'http://127.0.0.1:8000/api/v1/manufacturer';
  url: string = 'http://cinventory.000webhostapp.com/api/v1/manufacturer';
 //url: string = 'http://minicarinventory.epizy.com/public/api/v1/manufacturer';

  constructor(private http: HttpClient) { }

  
  getAllManufacturers(): Observable<Manufacturer>{
    return this.http.get<Manufacturer>(this.url);
  }

  createManufacturer(input: any): Observable<any>{

    return this.http.post<any>(this.url, input).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // updateManufacturer(manufacturer: Manufacturer): Observable<Manufacturer>{
  //   const httpOptions = { headers: new HttpHeaders({
  //     'Data-Type':'application/json'
  //   }) };
  //   return this.http.put<Manufacturer>(this.url+'/'+manufacturer.id, manufacturer, httpOptions);
  // }

  deleteManufacturerById(mId: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.delete<any>(this.url+'/'+mId, httpOptions).pipe(
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
