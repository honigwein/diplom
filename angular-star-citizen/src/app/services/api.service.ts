import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = "http://141.148.245.77:5005/api/"

  constructor(private http: HttpClient) { }

  public request(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: any
  ): Observable<any> {
    const url = `${this.apiUrl}${endpoint}`;
    const token = localStorage.getItem('access_token');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    let requestObservable: Observable<any>;

    switch (method) {
      case 'GET':
        requestObservable = this.http.get(url, { headers });
        break;
      case 'POST':
        requestObservable = this.http.post(url, data, { headers });
        break;
      case 'PUT':
        requestObservable = this.http.put(url, data, { headers });
        break;
      case 'DELETE':
        requestObservable = this.http.delete(url, { headers, body: data});
        break;
      default:
        throw new Error('Unsupported HTTP method');
    }

    return requestObservable.pipe(
      catchError(error => {
        return throwError(error.error);
      })
    );
  }
}