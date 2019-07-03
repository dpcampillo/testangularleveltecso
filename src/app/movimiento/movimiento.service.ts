import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LOGIN } from '../util';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  private URL_MOVIMIENTOS: string = environment.SERVER + '/movements'

  constructor(private httpClient: HttpClient) { } 

  listar(): Observable<any> {
    return this.httpClient.get(this.URL_MOVIMIENTOS, { headers: this.getAutorizacion() });
  }

  listarPorCuenta(idCuenta: number): Observable<any> {
    return this.httpClient.get(this.URL_MOVIMIENTOS + '?idAccount=' + idCuenta, {headers: this.getAutorizacion()});
  }

  guardar(body: any): Observable<any> {
    return this.httpClient.post(this.URL_MOVIMIENTOS, body, {headers: this.getAutorizacion()})
  }

  private getAutorizacion() {
    const token = localStorage.getItem(LOGIN);
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token)
    return headers
  }


}
