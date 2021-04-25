import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

class Options {
  pathNamePlural = '';
  pathName = '';
}

@Injectable({
  providedIn: 'root',
})
export abstract class ServiceEntityBase<Entity> {
  constructor(public http: HttpClient, public options: Options) {}

  async getEntities(): Promise<any> {
    return await this.http
      .get<Entity[]>(`api/${this.options.pathNamePlural}`)
      .toPromise();
  }

  async countEntities(): Promise<any> {
    return await this.http
      .get<number>(`api/${this.options.pathNamePlural}/count`)
      .toPromise();
  }

  async addEntity(entity: Entity): Promise<any> {
    return await this.http
      .post<Entity>(`api/${this.options.pathName}`, entity)
      .toPromise();
  }

  async getEntity(entity: any): Promise<any> {
    return await this.http
      .get<Entity>(`api/${this.options.pathName}/${entity._id}`)
      .toPromise();
  }

  async editEntity(entity: any): Promise<any> {
    return await this.http
      .put(`api/${this.options.pathName}/${entity._id}`, entity, {
        responseType: 'text',
      })
      .toPromise();
  }

  async deleteEntity(entity: any): Promise<any> {
    return await this.http
      .delete(`api/${this.options.pathName}/${entity._id}`, {
        responseType: 'text',
      })
      .toPromise();
  }
}
