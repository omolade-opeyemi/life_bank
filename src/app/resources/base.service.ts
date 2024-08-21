import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseUrl = environment.lifeBank

  constructor(private http: HttpClient) { }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error")
  }

  getVehicles() {
    return this.http.get(this.baseUrl + 'api/vehicles/')
  }
  paginate(id:any){
    return this.http.get(this.baseUrl + 'api/vehicles/?page='+id)
  }
}
