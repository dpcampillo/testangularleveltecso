import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validarFormulario } from '../util';
import Swal from 'sweetalert2';
import { CuentaService } from '../cuenta/cuenta.service';
import { MovimientoService } from '../movimiento/movimiento.service';

@Component({
  selector: 'app-movimiento-form',
  templateUrl: './movimiento-form.component.html',
  styleUrls: ['./movimiento-form.component.scss']
})
export class MovimientoFormComponent implements OnInit {

  @Output() public regresarEvent = new EventEmitter<any>();

  cuentas: any[] = []

  tiposMovimientos: any[] = [
    { tipo: 'Debito', codigo: 'D' },
    { tipo: 'Credito', codigo: 'C' }
  ]

  currencyActual: string = ''

  public formData: FormGroup;

  constructor(private fbuilder: FormBuilder, private cuentaService: CuentaService,
    private movimientoService: MovimientoService) {
    this.formData = fbuilder.group({
      account: [null, Validators.required],
      typemov: [null, Validators.required,],
      description: [null, Validators.required],
      amount: [null, Validators.required]
    })
    cuentaService.listar().subscribe(res => this.cuentas = res)
  }

  ngOnInit() {
  }

  onRegresar() {
    this.regresarEvent.emit({
      consultar: false
    })
  }

  onGuardar() {
    validarFormulario(this.formData)
    if (!this.formData.valid) {
      Swal.fire({
        title: 'Validar Formulario',
        html: 'Validar campos requeridos del formulario',
        type: "error"
      })
    } else {
      let body = this.formData.value
      this.movimientoService.guardar(body).subscribe(res => {
        Swal.fire({
          title: 'Informacion',
          html: 'Movimiento guardado satisfactoriamente',
          type: "info"
        }).then(rs => {
          this.regresarEvent.emit({
            consultar: true
          })
        })
      })
    }
  }

  onChangeCuenta(data: any) {
    if (data != null) {
      this.currencyActual = '(' + data.currency + ')'
    } else {
      this.currencyActual = ''
    }
  }

}
