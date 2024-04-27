import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UsuariosService } from 'src/app/services/usuarios.service';
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
  public user: any = {};
  public idUser: Number = 0;
  public array_user: any[] = [];

  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  //Para detectar errores
  public errors:any ={};


  constructor(
    private router: Router,
    private location: Location,
    public activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.user = this.usuariosService.esquemaUser();
    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista obtiene el usuario por su ID
      this.obtenerUserByID();
    }
    //Imprimir datos en consola
    console.log("User: ", this.user);
  }

    //Función para obtener un solo usuario por su ID
    public obtenerUserByID(){
      this.usuariosService.getUserByID(this.idUser).subscribe(
        (response)=>{
          this.user = response;
          //Agregamos valores faltantes
          this.user.first_name = response.user.first_name;
          this.user.last_name = response.user.last_name;
          this.user.email = response.user.email;
          this.user.fecha_nacimiento = response.fecha_nacimiento.split("T")[0];
          console.log("Datos user: ", this.user);
        }, (error)=>{
          alert("No se pudieron obtener los datos del usuario para editar");
        }
      );
    }

  public regresar(){
    this.location.back();
  }

  //Funciones para password
  showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  public goNuevoRegistro(){                     
    this.router.navigate(["registro-producto"]);
  } 

  showPwdConfirmar()
  {
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.usuariosService.validarUsuario(this.user, this.editar);    if(!$.isEmptyObject(this.errors)){
      //Pasa la validación y sale de la función
      return false;
    }
    //Valida la contraseña
    if(this.user.password == this.user.confirmar_password){
      //Funcion para registrarse - llamada al servicio
      this.usuariosService.registrarUsuario(this.user).subscribe(
      (response)=>{
      alert("Usuario registrado correctamente");
      console.log("Usuario registrado: ", response);
      this.router.navigate(["/"]);
      }, (error)=>{
        alert("No se pudo registrar usuario");
        console.log(error);
      }
    );   
    }else{
      alert("Las contraseñas no coinciden");
      this.user.password="";
      this.user.confirmar_password="";
    }
  }

  public actualizar(){
    //Validación
    this.errors = [];
    this.errors = this.usuariosService.validarUsuario(this.user, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Pasó la validación");
    this.usuariosService.editarUsuario(this.user).subscribe(
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

  //Función para detectar el cambio de fecha
  //Para la fecha
  public changeFecha(event :any){
    console.log(event);
    console.log(event.value.toISOString());
    
    this.user.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.user.fecha_nacimiento);
  }
}

