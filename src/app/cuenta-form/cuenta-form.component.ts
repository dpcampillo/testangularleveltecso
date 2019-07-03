import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TitularService } from '../titular/titular.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validarFormulario } from '../util';
import Swal from 'sweetalert2';
import { CuentaService } from '../cuenta/cuenta.service';

@Component({
  selector: 'app-cuenta-form',
  templateUrl: './cuenta-form.component.html',
  styleUrls: ['./cuenta-form.component.scss']
})
export class CuentaFormComponent implements OnInit {

  @Output() public regresarEvent = new EventEmitter<any>();

  titulares: any[] = []
  monedas: any[] = [{codigo: 'USD'}, {codigo: 'EUR'}, {codigo: 'ARS'}]

  currencyActual: string = ''

  public formData: FormGroup;

  constructor(private titularService: TitularService, private fbuilder: FormBuilder,
    private cuentaService: CuentaService) { 
    this.titularService.listar().subscribe(res => this.titulares = res)
    this.formData = fbuilder.group({
      accountHolder: [null, Validators.required],
      currency: [null, Validators.required],
      number: [null, Validators.required],
      balance: [null, Validators.required]
    })
  }

  ngOnInit() {
  }

  onChangeMoneda(data: any){
    if(data != null){
      this.currencyActual = data.codigo
    }else{
      this.currencyActual = ''
    }
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
      this.cuentaService.guardar(body).subscribe(res => {
        Swal.fire({
          title: 'Informacion',
          html: 'Cuenta guardada satisfactoriamente',
          type: "info"
        }).then(rs => {
          this.regresarEvent.emit({
            consultar: true
          })
        })
      })
    }
  }

}
