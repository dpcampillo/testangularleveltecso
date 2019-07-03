import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TitularComponent } from './titular/titular.component';
import { MovimientoComponent } from './movimiento/movimiento.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { ActiveGuard } from './active.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [ActiveGuard],
    children: [
      {
        path: 'titulares',
        component: TitularComponent
      },
      {
        path: 'movimientos',
        component: MovimientoComponent
      },
      {
        path: 'cuentas',
        component: CuentaComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
