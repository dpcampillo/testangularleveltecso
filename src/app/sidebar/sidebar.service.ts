import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  user: string = ''

  toggled = false;
  _hasBackgroundImage = false;
  menus = [
    {
      title: 'general',
      type: 'header'
    },
    {
      title: 'Opciones',
      icon: 'fa fa-list',
      active: false,
      type: 'dropdown',
      badge: {
        text: 'New ',
        class: 'badge-warning'
      },
      submenus: [
        {
          title: 'Titulares',
          url: '/titulares'
        },
        {
          title: 'Cuentas',
          url: '/cuentas'
        },
        {
          title: 'Movimientos',
          url: '/movimientos'
        }
      ]
    }
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }

  setUserSession(user){
    this.user = user
  }

}
