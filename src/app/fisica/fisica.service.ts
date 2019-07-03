import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LOGIN } from '../util';

@Injectable({
  providedIn: 'root'
})
export class FisicaService {

  private URL_FISICA: string = environment.SERVER + '/physicalpersons'

  constructor(private httpClient: HttpClient) { }

  consultar(id: number): Observable<any> {
    return this.httpClient.get(this.URL_FISICA + '/' + id)
  }

  guardar(body: any): Observable<any> {
    return this.httpClient.post(this.URL_FISICA, body)
  }

  actualizar(id: number, body: any): Observable<any> {
    return this.httpClient.put(this.URL_FISICA + '/' + id, body)
  }

  private getAutorizacion() {
    const token = localStorage.getItem(LOGIN);
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token)
    return headers
  }


}
