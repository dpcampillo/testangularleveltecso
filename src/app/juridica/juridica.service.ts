import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { LOGIN } from '../util';

@Injectable({
  providedIn: 'root'
})
export class JuridicaService {

  private URL_JURIDICA: string = environment.SERVER + '/legalpersons'

  constructor(private httpClient: HttpClient) { }

  consultar(id: number): Observable<any> {
    return this.httpClient.get(this.URL_JURIDICA + '/' + id, {headers: this.getAutorizacion()})
  }

  guardar(body: any): Observable<any> {
    return this.httpClient.post(this.URL_JURIDICA, body, {headers: this.getAutorizacion()})
  }

  actualizar(id: number, body: any): Observable<any> {
    return this.httpClient.put(this.URL_JURIDICA + '/' + id, body, {headers: this.getAutorizacion()})
  }

  private getAutorizacion() {
    const token = localStorage.getItem(LOGIN);
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token)
    return headers
  }

}
