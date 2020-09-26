import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

class Options {    
    pathNamePlural: string
    pathName: string
}

@Injectable({
  providedIn: 'root',
})
export abstract class EntityServiceBase<Entity> {
  constructor(public http: HttpClient, private options: Options) {}

  getEntities(): Observable<Entity[]> {
    return this.http.get<Entity[]>(`/${this.options.pathName}`);
  }

  countEntities(): Observable<number> {
    return this.http.get<number>(`/api/${this.options.pathNamePlural}/count`);
  }

  addEntity(entity: Entity): Observable<Entity> {
    return this.http.post<Entity>(`/api/${this.options.pathName}`, entity);
  }

  getEntity(entity: any): Observable<any> {
    return this.http.get<Entity>(`/api/${this.options.pathName}/${entity._id}`);
  }

  editEntity(entity: any): Observable<any> {
    return this.http.put(`/api/${this.options.pathName}/${entity._id}`, entity, { responseType: 'text' });
  }

  deleteEntity(entity: any): Observable<any> {
    return this.http.delete(`/api/${this.options.pathName}/${entity._id}`, { responseType: 'text' });
  }
}
