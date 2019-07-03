import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TitularComponent } from './titular/titular.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JuridicaComponent } from './juridica/juridica.component';
import { FisicaComponent } from './fisica/fisica.component';
import { HttpErrorInterceptor } from './util/HttpErrorInterceptor';
import { MovimientoComponent } from './movimiento/movimiento.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { CuentaService } from './cuenta/cuenta.service';
import { MovimientoFormComponent } from './movimiento-form/movimiento-form.component';
import { CuentaFormComponent } from './cuenta-form/cuenta-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { SidebarService } from './sidebar/sidebar.service';
import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TitularComponent,
    JuridicaComponent,
    FisicaComponent,
    MovimientoComponent,
    CuentaComponent,
    MovimientoFormComponent,
    CuentaFormComponent,
    LoginComponent,
    RegisterComponent,
    DefaultLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    PerfectScrollbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [
    CuentaService,
    SidebarService,
    RegisterService,
    LoginService,
    {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
