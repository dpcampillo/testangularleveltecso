import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TitularService } from './titular.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-titular',
  templateUrl: './titular.component.html',
  styleUrls: ['./titular.component.scss']
})
export class TitularComponent implements OnInit {

  verFormulario: boolean = false;
  verFisica: boolean = false;
  verJuridica: boolean = false;
  accion: string = ''

  titulares: Observable<any[]>;
  titularCurrent: any;

  constructor(private titularService: TitularService) {
    this.cargarTitulares()
  }

  ngOnInit() {
  }

  public getTipo(tipo: string){
    if(tipo === 'P'){
      return 'Persona Fisica'
    }else{
      return 'Persona Juridica'
    }
  }

  cargarTitulares() {
    this.titulares = this.titularService.listar()
  }

  onEventoRegresar(data: any){
    this.verFormulario = false;
    this.verFisica = false;
    this.verJuridica = false;
    if(data.consultar){
     this.cargarTitulares() 
    }
  }

  editarTitular(titular: any){
    if(titular.type === 'P'){
      this.verFisica = true;
    }else{
      this.verJuridica = true
    }
    this.verFormulario = true;
    this.accion = 'Editar'
    this.titularCurrent = titular;
  }

  eliminarTitular(titular: any) {
    Swal.fire({
      title: 'Confirmacion',
      html: '¿Esta seguro que desea eliminar este titular?',
      type: "question",
      showCancelButton: true,
      confirmButtonText: 'Si, deseo eliminar el registro',
      cancelButtonText: 'No',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn-danger sweet-alert-cancel',
      buttonsStyling: false
    }).then(rs => {
      if (rs.value) {
        this.titularService.eliminar(titular.id).subscribe(result => {
          Swal.fire({
            title: 'Informacion',
            html: 'El titular ha sido eliminado satisfactoriamente',
            type: "info"
          }).then(q => this.cargarTitulares())
        })
      }
    })
  }

  nuevaPersonaJuridica(){
    this.accion = 'Registrar'
    this.verFisica = false;
    this.verJuridica = true;
    this.verFormulario = true;
    this.titularCurrent = null;
  }

  nuevaPersonaFisica(){
    this.accion = 'Registrar'
    this.verFisica = true;
    this.verJuridica = false;
    this.verFormulario = true;
    this.titularCurrent = null;
  }


}
