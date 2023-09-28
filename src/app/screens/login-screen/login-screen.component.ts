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

  constructor(
    private router: Router,
    public facadeService: FacadeService
  ) { }


  ngOnInit(): void {
  }

 public login(){
    //Validar
    this.errors = [];

    this.errors = this.facadeService.validarLogin(this.username, this.password);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    //Si pasa la validación
    this.router.navigate(["home"]);
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

