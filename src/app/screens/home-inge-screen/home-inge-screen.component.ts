import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home-inge-screen',
  templateUrl: './home-inge-screen.component.html',
  styleUrls: ['./home-inge-screen.component.scss']
})
export class HomeIngeScreenComponent implements OnInit {

  public token : string = "";
  public lista_usuarios: any[] = [];


    
    constructor(
      private facadeService: FacadeService,
      private usuariosService: UsuariosService,
      private router: Router,
      public dialog: MatDialog
    ) { }
  
    ngOnInit(): void {
      //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);
    
    if(this.token == ""){
      this.router.navigate([""]);
    }
  }
  
  //Cerrar sesión
  public logout(){
    this.facadeService.logout().subscribe(
      (response)=>{
        console.log("Entró");
        this.facadeService.destroyUser();
        //Navega al login
        this.router.navigate(["/"]);
      }, (error)=>{
        console.error(error);
      }
    );
  }

  public goRegistroMaterias(){
    this.router.navigate(["registro-materia"]);
  }

  }//Aquí cierra la clase principal
