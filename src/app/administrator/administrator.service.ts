import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Administrator } from './administrator';

@Injectable()
export class AdministratorService {

  result: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private administratorsUrl = 'api/administrators';  // URL to administrator api

  constructor(private http: Http) { }

  getAdministrators(): Promise<Administrator[]> {
    return this.http.get(this.administratorsUrl)
      .toPromise()
      .then(response => response.json().data as Administrator[])
      .catch(this.handleError);
  }

  getAdministrator(id: number): Promise<Administrator> {
    const url = `${this.administratorsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Administrator)
      .catch(this.handleError);
  }
  getAdministratorUsername(username: string): Promise<Administrator> {
    const url = `${this.administratorsUrl}/${username}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Administrator)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Unable to retrieve administrators', error);
    return Promise.reject(error.message || error);
  }

}
