import { Component, OnInit } from '@angular/core';
import { validarFormulario } from '../util';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formData: FormGroup;

  constructor(private loginService: LoginService, private fbuilder: FormBuilder,
    private router: Router) {
    this.formData = fbuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  ngOnInit() {
  }

  onIniciar() {
    validarFormulario(this.formData)
    if (!this.formData.valid) {
      Swal.fire({
        title: 'Validar Formulario',
        html: 'Validar campos requeridos del formulario',
        type: "error"
      })
    } else {
      let body = this.formData.value
      this.loginService.login(body).subscribe(res => {
      })
    }
  }

}
