import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ContactosempService } from 'src/app/services/contactosemp.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-registro-contacto-e-screen',
  templateUrl: './registro-contacto-e-screen.component.html',
  styleUrls: ['./registro-contacto-e-screen.component.scss']
})
export class RegistroContactoEScreenComponent implements OnInit {

  //Aquí van las variables
  public editar:boolean = false;
  public contactosemp: any = {};
  public idcontactoemp: Number = 0;
  public array_user: any[] = [];

  //Para detectar errores
  public errors:any ={};


  constructor(
    private router: Router,
    private location: Location,
    public activatedRoute: ActivatedRoute,
    private contactosempService: ContactosempService
  ) { }

  ngOnInit(): void {
 

    //Imprimir datos en consola
  
  }

    //Función para obtener un solo usuario por su ID
 
    public registrar(){
      //Validar
      this.errors = [];
  
      this.errors = this.contactosempService.validarContactosEmp(this.contactosemp, this.editar);    if(!$.isEmptyObject(this.errors)){
        //Pasa la validación y sale de la función
        return false;
      }
    }

  public regresar(){
    this.location.back();
  }

  public goNuevoRegistro(){                     
    this.router.navigate(["registro-producto"]);
  } 


  //Función para detectar el cambio de fecha
  //Para la fecha
}

