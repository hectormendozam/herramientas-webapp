import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MateriasService } from 'src/app/services/materias.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-registro-materia-screen',
  templateUrl: './registro-materia-screen.component.html',
  styleUrls: ['./registro-materia-screen.component.scss']
})
export class RegistroMateriaScreenComponent implements OnInit {
  
    //Aquí van las variables
    public editar:boolean = false;
    public materia: any = {};
    public idMateria: Number = 0;
    public array_materia: any[] = [];
    public programas = ['Ingeniería en Tecnologías de la Información', 'Ingeniería en Ciencias de la Computación', 'Licenciatura en Ciencias de la Computación']
  
    //Para detectar errores
    public errors:any ={};

  constructor(
    private router: Router,
    private location: Location,
    public activatedRoute: ActivatedRoute,
    private MateriasService: MateriasService,
  ) { }

  ngOnInit(): void {
    this.materia = this.MateriasService.esquemaMateria();
    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idMateria = this.activatedRoute.snapshot.params['id'];
      console.log("ID Materia: ", this.idMateria);
      //Al iniciar la vista obtiene el usuario por su ID
      this.obtenerUserByID();
    }
    //Imprimir datos en consola
    console.log("User: ", this.materia);
  }

  //Función para obtener un solo usuario por su ID
  public obtenerUserByID(){
    this.MateriasService.getMateriaByID(this.idMateria).subscribe(
      (response)=>{
        this.materia = response;
        //Agregamos valores faltantes
        this.materia.nrc = response.materia.nrc;
        this.materia.nombre_materia = response.materia.nombre_materia;
        this.materia.seccion = response.materia.seccion;
        this.materia.dias = response.materia.dias;
        this.materia.hora_inicio = response.materia.hora_inicio;
        this.materia.hora_final = response.materia.hora_final;
        this.materia.programa_educativo = response.materia.programa_educativo;

        //this.materia.fecha_nacimiento = response.fecha_nacimiento.split("T")[0];
        console.log("Datos materia: ", this.materia);
      }, (error)=>{
        alert("No se pudieron obtener los datos de la materia para editar");
      }
    );
  }

  public regresar(){
    this.location.back();
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.MateriasService.validarMateria(this.materia, this.editar);    if(!$.isEmptyObject(this.errors)){
      //Pasa la validación y sale de la función
      return false;
    }
      //Funcion para registrarse - llamada al servicio
      this.MateriasService.registrarMateria(this.materia).subscribe(
      (response)=>{
      alert("Usuario registrado correctamente");
      console.log("Usuario registrado: ", response);
      this.router.navigate(["/"]);
      }, (error)=>{
        alert("No se pudo registrar usuario");
        console.log(error);
      }
    );   
  }

  public actualizar(){
    //Validación
    this.errors = [];
    this.errors = this.MateriasService.validarMateria(this.materia, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Pasó la validación");
    this.MateriasService.editarMateria(this.materia).subscribe(
      (response)=>{
        alert("Usuario editado correctamente");
        console.log("Usuario editado: ", response);
        //Si se editó, entonces mandar al home
        this.router.navigate(["home"]);
      }, (error)=>{
        alert("No se pudo editar usuario");
      }
    );
  }
}
