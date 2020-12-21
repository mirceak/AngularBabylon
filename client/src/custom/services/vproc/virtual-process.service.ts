import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VirtualProcessService {

  constructor(private http: HttpClient) { }

  connect(): Observable<any> {
    return this.http.get<string>('/utils/tunnel');
  }
  lock(data): Observable<any> {
    return this.http.post<string>('/utils/tunnel', data);
  }
}
