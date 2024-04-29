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
    this.contactosemp = this.contactosempService.esquemaUser();
    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idcontactoemp = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idcontactoemp);
      //Al iniciar la vista obtiene el usuario por su ID
      this.obtenerContactoByID();
    }
    //Imprimir datos en consola
    console.log("User: ", this.contactosemp);

    //Imprimir datos en consola
  
  }


 
    public registrar(){
      //Validar
      this.errors = [];
  
      this.errors = this.contactosempService.validarContactosEmp(this.contactosemp, this.editar);    
      if(!$.isEmptyObject(this.errors)){
        //Pasa la validación y sale de la función
        return false;
      }


       //Aquí si todo es correcto vamos a registrar - aquí se manda a llamar al servicio
       this.contactosempService.registrarContactoEmp(this.contactosemp).subscribe(
        (response)=>{
          alert("Contacto empresarial registrado correctamente");
          console.log("Contacto registrado: ", response);
          this.router.navigate(["directorio-e"]);
        }, (error)=>{
          alert("No se pudo registrar el contacto empresarial");
        }
      )
    }

    //Función para obtener los datos de una sola materia por su NRC
 public obtenerContactoByID(){
  this.contactosempService.getContactoByID(this.idcontactoemp).subscribe(
    (response)=>{
      this.contactosemp = response;
      //Agregamos valores faltantes
      this.contactosemp.nombre_nombre_empresa = response.materia.nombre_nombre_empresa;
      this.contactosemp.nombre_giro = response.materia.nombre_giro;
      this.contactosemp.nombre_direccion_postal = response.materia.direccion_postal;
      this.contactosemp.nombre_representante_legal = response.materia.representante_legal;
      this.contactosemp.nombre_telefono = response.materia.nombre_telefono;
      this.contactosemp.nombre_correo_electronico = response.materia.nombre_correo_electronico;

      //this.materia.fecha_nacimiento = response.fecha_nacimiento.split("T")[0];
      console.log("Datos contacto: ", this.contactosemp);
    }, (error)=>{
      alert("No se pudieron obtener los datos del contacto para editar");
    }
  );
 }

    //Funcion para actualizar datos de una materia (se llama al servicio de editar contacto)
 public actualizar(){
  //Validación
  this.errors = [];

  this.errors = this.contactosempService.validarContactosEmp(this.contactosemp, this.editar);
  if(!$.isEmptyObject(this.errors)){
    return false;
  }
  console.log("Pasó la validación");

  this.contactosempService.editarContactoemp(this.contactosemp).subscribe(
    (response)=>{
      alert("Contacto editado correctamente");
      console.log("Materia editada: ", response);
      //Si se editó, entonces mandar al home de materias
      this.router.navigate(["directorio-e"]);
    }, (error)=>{
      alert("No se pudo editar el contacto");
    }
  );
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

