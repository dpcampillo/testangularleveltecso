import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private URL_REGISTER: string = environment.SERVER + '/register'

  constructor(private httpClient: HttpClient) { }

  registar(body: any): Observable<any> {
    return this.httpClient.post(this.URL_REGISTER, body)
  }

}
