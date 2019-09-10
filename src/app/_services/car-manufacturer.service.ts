import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { Manufacturer } from '../_models/manufacturer.model';

@Injectable({
  providedIn: 'root'
})
export class CarManufacturerService {

  //url: string = 'http://127.0.0.1:8000/api/v1/manufacturer';
  url: string = 'https://cinventory.000webhostapp.com/api/v1/manufacturer';
 //url: string = 'http://minicarinventory.epizy.com/public/api/v1/manufacturer';

  constructor(private http: HttpClient) { }

  
  getAllManufacturers(): Observable<Manufacturer>{
    return this.http.get<Manufacturer>(this.url);
  }

  getManufacturerById(mId: string): Observable<Manufacturer>{
    return this.http.get<Manufacturer>(this.url+'/'+mId+'/edit');
  }

  createManufacturer(manufacturer: any): Observable<any>{
    const httpOptions = { headers: new HttpHeaders({
      'Data-Type':'application/json'
    }) };
    return this.http.post<any>(this.url, manufacturer, httpOptions);
  }

  updateManufacturer(manufacturer: Manufacturer): Observable<Manufacturer>{
    const httpOptions = { headers: new HttpHeaders({
      'Data-Type':'application/json'
    }) };
    return this.http.put<Manufacturer>(this.url+'/'+manufacturer.id, manufacturer, httpOptions);
  }

  deleteManufacturerById(mId: string): Observable<any>{
    const httpOptions = {headers: new HttpHeaders({ 
      'Data-Type':'application/json'
    }) };
    return this.http.delete<any>(this.url+'/'+mId, httpOptions);
  }

}
