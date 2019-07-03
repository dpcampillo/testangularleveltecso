import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LOGIN } from '../util';

@Injectable({
  providedIn: 'root'
})
export class TitularService {

  private URL_TITULAR: string = environment.SERVER + '/accountholders'

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<any> {
    return this.httpClient.get(this.URL_TITULAR, {headers: this.getAutorizacion()})
  }

  eliminar(id: number): Observable<any> {
    return this.httpClient.delete(this.URL_TITULAR + '/' + id, {headers: this.getAutorizacion()})
  }

  private getAutorizacion() {
    const token = localStorage.getItem(LOGIN);
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token)
    return headers
  }

}
