import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LOGIN } from './util';

@Injectable({
  providedIn: 'root'
})
export class ActiveGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree  {
      console.log('Hemos entrado al active guard')
      console.log(localStorage.getItem(LOGIN))
      if (localStorage.getItem(LOGIN) != null) {   
        return true;
      } else {
        console.log('redireccionando')
        return this.router.parseUrl("/login");
      }

  }
}
