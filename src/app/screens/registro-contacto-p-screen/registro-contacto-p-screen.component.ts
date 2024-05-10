import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ContactopService } from 'src/app/services/contactop.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-registro-contacto-p-screen',
  templateUrl: './registro-contacto-p-screen.component.html',
  styleUrls: ['./registro-contacto-p-screen.component.scss']
})
export class RegistroContactoPScreenComponent implements OnInit {

  //Aquí van las variables
  public editar:boolean = false;
  public contactop: any = {};
  public idcontactop: Number = 0;
  public array_user: any[] = [];

  //Para detectar errores
  public errors:any ={};


  constructor(
    private router: Router,
    private location: Location,
    public activatedRoute: ActivatedRoute,
    private contactopService: ContactopService
  ) { }

  ngOnInit(): void {
    this.contactop = this.contactopService.esquemaUser();
    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idcontactop = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idcontactop);
      //Al iniciar la vista obtiene el usuario por su ID
      this.obtenerContactopByID();
    }
    //Imprimir datos en consola
    console.log("User: ", this.contactop);

  }


 
  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.contactopService.validarContactop(this.contactop, this.editar);    
    if(!$.isEmptyObject(this.errors)){
      //Pasa la validación y sale de la función
      return false;
    }


     //Aquí si todo es correcto vamos a registrar - aquí se manda a llamar al servicio
     this.contactopService.registrarContactop(this.contactop).subscribe(
      (response)=>{
        alert("Contacto personal registrado correctamente");
        console.log("Contacto registrado: ", response);
        this.router.navigate(["directorio-p"]);
      }, (error)=>{
        alert("No se pudo registrar el contacto personal");
      }
    )
  }

    //Función para obtener los datos de una solo por su id
 public obtenerContactopByID(){
  this.contactopService.getContactopByID(this.idcontactop).subscribe(
    (response)=>{
      this.contactop = response;
      //Agregamos valores faltantes
      this.contactop.nombre_nombre_contacto = response.contactop.nombre_nombre_contacto;
      this.contactop.nombre_direccion_postal = response.contactop.nombre_direccion_postal;
      this.contactop.nombre_correo_electronico = response.contactop.nombre_correo_electronico;
      this.contactop.nombre_telefono_particular = response.contactop.nombre_telefono_particular;
      this.contactop.nombre_telefono_celular = response.contactop.nombre_telefono_celular;
      this.contactop.nombre_parentesco = response.contactop.nombre_parentesco;

      //this.materia.fecha_nacimiento = response.fecha_nacimiento.split("T")[0];
      console.log("Datos contacto: ", this.contactop);
    }, (error)=>{
      alert("No se pudieron obtener los datos del contacto para editar");
    }
  );
 }

    //Funcion para actualizar datos de una materia (se llama al servicio de editar contacto)
  public actualizar(){
  //Validación
  this.errors = [];
    
  this.errors = this.contactopService.validarContactop(this.contactop, this.editar);
  if(!$.isEmptyObject(this.errors)){
    return false;
  }
  console.log("Pasó la validación");
    
  this.contactopService.editarContactop(this.contactop).subscribe(
    (response)=>{
      alert("Contacto editado correctamente");
      console.log("Contacto editado: ", response);
      //Si se editó, entonces mandar al home de materias
      this.router.navigate(["directorio-p"]);
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