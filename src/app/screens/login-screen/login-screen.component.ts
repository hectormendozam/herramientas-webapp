import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
declare var $:any;

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})

export class LoginScreenComponent implements OnInit {

  //Aquí se definen las variables
  public type: String = "password";
  public username: String = "";
  public password: String = "";

  public errors:any = {};

  public users_registrados: any = [];
  public logeo: boolean = false;
  public flag_email: boolean = false;
  public flag_pwd: boolean = false;

  constructor(
    private router: Router,
    public facadeService: FacadeService
  ) { }


  ngOnInit(): void {
    this.llenadoUsuarios();
  }

  public llenadoUsuarios(){
    this.users_registrados = [
      {
        'matricula': "222570195",
        'first_name': "Luis Yael",
        'last_name': "Méndez Sánchez",
        'email': "luisyaelms@gmail.com",
        'password': "yael1234",
        'confirmar_password': "yael1234",
        'fecha_nacimiento': "1995-10-07",
        'curp': "MESL951007HVZNNS01",
        'rfc': "MESL951007S73",
        'edad': "28",
        'telefono': "2226621788",
        'ocupacion': "Docente",
      },
      {
        'matricula': "234567898",
        'first_name': "Alfredo",
        'last_name': "Herrera Mora",
        'email': "alfredo@gmail.com",
        'password': "1234",
        'confirmar_password': "1234",
        'fecha_nacimiento': "1994-11-17",
        'curp': "MESL951007HVZNNS01",
        'rfc': "MESL951007S73",
        'edad': "28",
        'telefono': "2226622288",
        'ocupacion': "Administrador",
      }
    ];
    console.log("Usuario es: ", this.users_registrados);
    
  }

 public login(){
    //Validar
    this.errors = [];

    this.errors = this.facadeService.validarLogin(this.username, this.password);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Pasó validación");
    //Si pasa la validación
    //Tendría que logearse
    this.buscarUser(this.username, this.password);
    //Si se encuentra o no vienen los 3 casos
    if(this.logeo){
      //alert("Usuario encontrado");
      this.router.navigate(["home"]);
    }else{
      alert("Usuario y contraseña incorrectos");
    }
    
    
  }

  public buscarUser(username: String, pwd: String){
    //Tendría que logearse
    this.users_registrados.forEach(user => {
      if(user.email == username){
        if(user.password == pwd){
          this.logeo = true; //Si se cumplen ambas cadenas
        }else{
          //Esta servirá para mandar un mensaje si la contraseña
          this.flag_pwd = true;
        }
      }else{
        //Esta servirá para mandar un mensaje si el email está mal
        this.flag_email = true;
      }
    });
  }

  public showPassword(){
    if(this.type == "password"){
      this.type = "text";
    }else{
      this.type = "password";
    }
  }

  public goRegistro(){
    this.router.navigate(["registro"]);
  }

  public goNuevoLogin(){                     
    this.router.navigate(["nuevo-login"]);
  } 

  public goNuevoRegistro(){                     
    this.router.navigate(["registro-producto"]);
  } 
  
}//Fin clase

