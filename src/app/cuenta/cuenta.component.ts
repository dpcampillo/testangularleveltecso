import { Component, OnInit } from '@angular/core';
import { CuentaService } from './cuenta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {

  verFormulario: boolean = false;
  accion: string = ''

  cuentas: any[] = []

  constructor(private cuentaService: CuentaService) {
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
      this.cargarCuentas()
    }
  }

  nuevaCuenta(){
    this.verFormulario = true;
    this.accion = 'Registrar'
  }

  eliminarCuenta(cuenta: any) {
    Swal.fire({
      title: 'Confirmacion',
      html: '¿Esta seguro que desea eliminar esta cuenta?',
      type: "question",
      showCancelButton: true,
      confirmButtonText: 'Si, deseo eliminar el registro',
      cancelButtonText: 'No',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn-danger sweet-alert-cancel',
      buttonsStyling: false
    }).then(rs => {
      if (rs.value) {
        this.cuentaService.eliminar(cuenta.id).subscribe(result => {
          Swal.fire({
            title: 'Informacion',
            html: 'La cuenta ha sido eliminada satisfactoriamente',
            type: "info"
          }).then(q => this.cargarCuentas())
        })
      }
    })
  }

}
