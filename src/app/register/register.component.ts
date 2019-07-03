import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validarFormulario } from '../util';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: FormGroup;

  constructor(private registerService: RegisterService, private fbuilder: FormBuilder,
    private router: Router) {
    this.formData = fbuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  ngOnInit() {
  }

  onGuardar(){
    validarFormulario(this.formData)
    if (!this.formData.valid) {
      Swal.fire({
        title: 'Validar Formulario',
        html: 'Validar campos requeridos del formulario',
        type: "error"
      })
    } else {
      let body = this.formData.value
      this.registerService.registar(body).subscribe(res => {
        Swal.fire({
          title: 'Informacion',
          html: 'Usuario registrado satisfactoriamente',
          type: "info"
        }).then(rs => {
          this.router.navigate(['/login'])
        })
      })
    }
  }



}
