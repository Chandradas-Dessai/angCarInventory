import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  //url: string = 'http://127.0.0.1:8000/api/v1/inventory';
  url: string = 'http://minicarinventory.epizy.com/public/api/v1/inventory';
  constructor(private http: HttpClient) { }

  getInventory(): Observable<any>{
    return this.http.get<any>(this.url);
  }

  getInventoryDetailsById(mId: string): Observable<any>{
    return this.http.get<any>(this.url+'/'+mId);
  }

  deleteInventoryById(InvId: string): Observable<any>{
    const httpOptions = {headers: new HttpHeaders({ 
      'Data-Type':'application/json'
    }) };
    return this.http.delete<any>(this.url+'/'+InvId, httpOptions);
  }
}
