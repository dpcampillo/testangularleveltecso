import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FisicaService } from './fisica.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validarFormulario } from '../util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fisica',
  templateUrl: './fisica.component.html',
  styleUrls: ['./fisica.component.scss']
})
export class FisicaComponent implements OnInit {

  @Output() public regresarEvent = new EventEmitter<any>();
  public formData: FormGroup;
  public personaFisica: any;

  constructor(private fbuilder: FormBuilder, private fisicaService: FisicaService) { 
    this.formData = fbuilder.group({
      rut: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      firstname: [null, Validators.compose([Validators.required, Validators.maxLength(80)])],
      lastname: [null, Validators.compose([Validators.required, Validators.maxLength(250)])],
      identification: [null, Validators.compose([Validators.required, Validators.maxLength(20)])]
    })
  }

  ngOnInit() {
  }

  @Input()
  public set titular(obj: any) {
    if (obj != null) {
      this.fisicaService.consultar(obj.id).subscribe(res => {
        this.personaFisica = res;
        this.formData.patchValue({
          rut: res.rut,
          firstname: res.firstname,
          lastname: res.lastname,
          identification: res.identification
        })
      })
    }
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
      let body = this.formData.value;
      if (this.personaFisica != null) {
        this.fisicaService.actualizar(this.personaFisica.id, body).subscribe(res => {
          Swal.fire({
            title: 'Informacion',
            html: 'Persona Fisica actualizada satisfactoriamente',
            type: "info"
          }).then(rs => {
            this.regresarEvent.emit({
              consultar: true
            })
          })
        })
      } else {
        this.fisicaService.guardar(body).subscribe(res => {
          Swal.fire({
            title: 'Informacion',
            html: 'Persona Fisica guardada satisfactoriamente',
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

  onRegresar() {
    this.regresarEvent.emit({
      consultar: false
    })
  }

}
