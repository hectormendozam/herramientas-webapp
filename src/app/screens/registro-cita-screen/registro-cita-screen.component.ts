import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CitasService } from 'src/app/services/citas.service';
import { MatTableDataSource } from '@angular/material/table';
import { ContactosempService } from 'src/app/services/contactosemp.service';
import { ContactopService } from 'src/app/services/contactop.service';

declare var $:any;

@Component({
  selector: 'app-registro-cita-screen',
  templateUrl: './registro-cita-screen.component.html',
  styleUrls: ['./registro-cita-screen.component.scss'],
})
export class RegistroCitaScreenComponent implements OnInit {

  //Aquí van las variables
  public editar:boolean = false;
  public cita: any = {};
  public idcita: Number = 0;
  public array_user: any[] = [];
  public lista_contactosemp: any[] = [];
  public lista_contactop: any[] = [];
  dataSource = this.lista_contactosemp as DatosContactoemp[];
  dataSourcep = this.lista_contactop as DatosContactop[];

  //Para detectar errores
  public errors:any ={};


  constructor(
    private router: Router,
    private location: Location,
    public activatedRoute: ActivatedRoute,
    private citasService: CitasService,
    private contactosempService: ContactosempService,
    private contactopService: ContactopService
  ) { }

  ngOnInit(): void {
    this.cita = this.citasService.esquemaUser();
    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idcita = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idcita);
      //Al iniciar la vista obtiene la cita por su ID
      this.obtenerCitaByID();
    }
    //Imprimir datos en consola
    console.log("User: ", this.cita);

    //Mandar a ejecutar la función
    this.obtenerListaContactosEmp();
    this.obtenerListaContactop();

    //Imprimir datos en consola
  
  }

 
    public registrar(){
      //Validar
      this.errors = [];
  
      this.errors = this.citasService.validarCita(this.cita, this.editar);    
      if(!$.isEmptyObject(this.errors)){
        //Pasa la validación y sale de la función
        return false;
      }


       //Aquí si todo es correcto vamos a registrar - aquí se manda a llamar al servicio
       this.citasService.registrarCita(this.cita).subscribe(
        (response)=>{
          alert("Cita registrada correctamente");
          console.log("Cita registrada: ", response);
          this.router.navigate(["agenda"]);
        }, (error)=>{
          alert("No se pudo registrar la cita");
        }
      )
    }

       //Función para obtener los datos de una sola cita por su ID
 public obtenerCitaByID(){
  this.citasService.getCitaByID(this.idcita).subscribe(
    (response)=>{
      this.cita = response;
      //Agregamos valores faltantes
      this.cita.nombre_nombre_persona = response.citas.nombre_persona;
      this.cita.nombre_fecha = response.citas.fecha.split("T")[0];
      this.cita.nombre_hora_inicio = response.citas.hora_inicio;
      this.cita.nombre_hora_fin = response.citas.hora_fin;
      this.cita.nombre_lugar = response.citas.lugar
      this.cita.nombre_asunto = response.citas.asunto;

      //this.materia.fecha_nacimiento = response.fecha_nacimiento.split("T")[0];
      console.log("Datos cita: ", this.cita);
    }, (error)=>{
      alert("No se pudieron obtener los datos de la cita para editar");
    }
  );
 }

    //Funcion para actualizar datos de una cita (se llama al servicio de editar cita)
 public actualizar(){
  //Validación
  this.errors = [];

  this.errors = this.citasService.validarCita(this.cita, this.editar);
  if(!$.isEmptyObject(this.errors)){
    return false;
  }
  console.log("Pasó la validación");

  this.citasService.editarCita(this.cita).subscribe(
    (response)=>{
      alert("Cita editada correctamente");
      console.log("Cita editada: ", response);
      //Si se editó, entonces mandar al home de citas
      this.router.navigate(["agenda"]);
    }, (error)=>{
      alert("No se pudo editar la cita");
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
  public changeFecha(event :any){
    console.log(event);
    console.log(event.value.toISOString());
    
    this.cita.fecha = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.cita.fecha);
  }

 //Obtener lista de contactos empresariales
 public obtenerListaContactosEmp(){
  this.contactosempService.obtenerListaContactosEmp().subscribe(
    (response)=>{
      this.lista_contactosemp = response;
      console.log("Lista contactos empresariales: ", this.lista_contactosemp);
      if(this.lista_contactosemp.length > 0){
        this.dataSource = this.lista_contactosemp as DatosContactoemp[];
      }
    }, (error)=>{
      alert("No se pudo obtener la lista de materias");
    }
  );
}

  //Obtener lista de contactos personales
  public obtenerListaContactop(){
    this.contactopService.obtenerListaContactop().subscribe(
      (response)=>{
        this.lista_contactop = response;
        console.log("Lista contactos personales: ", this.lista_contactop);
        if(this.lista_contactop.length > 0){
          this.dataSourcep = this.lista_contactop as DatosContactop[];
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de contactos personales");
      }
    );
  }

}

export interface DatosContactoemp {
  id: number,
  nombre_empresa: string;
}

export interface DatosContactop {
  id: number,
  nombre_contacto: string;
}