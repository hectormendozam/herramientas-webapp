import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-login-screen',
  templateUrl: './nuevo-login-screen.component.html',
  styleUrls: ['./nuevo-login-screen.component.scss']
})

export class NuevoLoginScreenComponent implements OnInit {

  //Aquí se definen las variables
  public type: String = "password";
  public username: String = "";
  public password: String = "";

  public errors:any = {};

  constructor(
    private router: Router
  ) { }


  ngOnInit(): void {
  }

 public login(){
    if(this.username == ""){
      this.errors.username = "Campo requerido";
    }
    if(this.password == ""){
      this.errors.password = "Campo requerido";
    }
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

}//Fin clase
