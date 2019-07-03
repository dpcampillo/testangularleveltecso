import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LOGIN, USER_APP } from '../util';
import { Router } from '@angular/router';
import { SidebarService } from '../sidebar/sidebar.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL_LOGIN: string = environment.SERVER + '/login'

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(body: any):  Observable<any> {
    return this.httpClient.post(this.URL_LOGIN, body).pipe(
      tap(res => {
        localStorage.setItem(LOGIN, res.Authorization)
        localStorage.setItem(USER_APP, body.username)
        this.router.navigate(['/'])
      })
    )
  }

  logout() {
    localStorage.removeItem(LOGIN)
    localStorage.removeItem(USER_APP)
    this.router.navigate(['/login'])
  }

}
