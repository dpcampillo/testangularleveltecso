import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validarFormulario } from '../util';
import Swal from 'sweetalert2';
import { JuridicaService } from './juridica.service';

@Component({
  selector: 'app-juridica',
  templateUrl: './juridica.component.html',
  styleUrls: ['./juridica.component.scss']
})
export class JuridicaComponent implements OnInit {

  @Output() public regresarEvent = new EventEmitter<any>();

  public formData: FormGroup;
  public personaJuridica: any;

  constructor(private fbuilder: FormBuilder, private juridicaService: JuridicaService) {
    this.formData = fbuilder.group({
      rut: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      businessname: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
      founded: [null, Validators.compose([Validators.required, Validators.min(1900)])]
    })
  }

  ngOnInit() {
  }

  @Input()
  public set titular(obj: any) {
    if (obj != null) {
      this.juridicaService.consultar(obj.id).subscribe(res => {
        this.personaJuridica = res;
        this.formData.patchValue({
          rut: res.rut,
          businessname: res.businessname,
          founded: res.founded
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
      if (this.personaJuridica != null) {
        this.juridicaService.actualizar(this.personaJuridica.id, body).subscribe(res => {
          Swal.fire({
            title: 'Informacion',
            html: 'Persona juridica actualizada satisfactoriamente',
            type: "info"
          }).then(rs => {
            this.regresarEvent.emit({
              consultar: true
            })
          })
        })
      } else {
        this.juridicaService.guardar(body).subscribe(res => {
          Swal.fire({
            title: 'Informacion',
            html: 'Persona juridica guardada satisfactoriamente',
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
