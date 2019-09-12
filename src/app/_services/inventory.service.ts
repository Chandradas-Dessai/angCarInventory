import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  //url: string = 'http://127.0.0.1:8000/api/v1/inventory';
  //url: string = 'http://minicarinventory.epizy.com/public/api/v1/inventory';
  url: string = 'http://cinventory.000webhostapp.com/api/v1/inventory';

  constructor(private http: HttpClient) { }

  getInventory(): Observable<any>{
    return this.http.get<any>(this.url);
  }

  getInventoryDetailsById(mId: string): Observable<any>{
    return this.http.get<any>(this.url+'/'+mId);
  }

  deleteInventoryById(InvId: any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': '*',
                     'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS, PUT, HEAD',
                     'Access-Control-Allow-Headers': 'Content-Type' })};

    return this.http.delete<any>(this.url+'/'+InvId, httpOptions).pipe(
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
