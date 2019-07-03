import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovimientoService } from './movimiento.service';
import { CuentaService } from '../cuenta/cuenta.service';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.scss']
})
export class MovimientoComponent implements OnInit {

  verFormulario: boolean = false;
  accion: string = ''

  movimientos: any[] = [];
  modelo: any = {
    cuenta: null
  }
  cuentas: any[]

  constructor(private movimientoService: MovimientoService,
    private cuentaService: CuentaService) {
    this.cargarMovimientos()
    this.cargarCuentas()
  }

  ngOnInit() {
  }

  cargarCuentas() {
    this.cuentaService.listar().subscribe(res => this.cuentas = res)
  }

  onEventoRegresar(data: any) {
    this.verFormulario = false;
    if (data.consultar) {
      this.cargarMovimientos()
    }
  }

  cargarMovimientos() {
    if (this.modelo.cuenta != null) {
      this.movimientoService.listarPorCuenta(this.modelo.cuenta).subscribe(res => this.movimientos = res)
    } else {
      this.movimientoService.listar().subscribe(res => this.movimientos = res)
    }
  }

  getTipo(tipo: string) {
    if (tipo == 'D') {
      return "Debito";
    } else {
      return "Credito";
    }
  }

  nuevoMovimiento() {
    this.accion = 'Registrar'
    this.verFormulario = true;
  }

  onChangeCuenta(data: any) {
    this.cargarMovimientos()
  }

}
