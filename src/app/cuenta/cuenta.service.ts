import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LOGIN } from '../util';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private URL_CUENTAS: string = environment.SERVER + '/accounts'

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<any> {
    return this.httpClient.get(this.URL_CUENTAS, { headers: this.getAutorizacion() });
  }

  guardar(body: any): Observable<any> {
    return this.httpClient.post(this.URL_CUENTAS, body, { headers: this.getAutorizacion() })
  }

  eliminar(id: number): Observable<any> {
    return this.httpClient.delete(this.URL_CUENTAS + '/' + id, { headers: this.getAutorizacion() })
  }

  private getAutorizacion() {
    const token = localStorage.getItem(LOGIN);
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token)
    return headers
  }

}
