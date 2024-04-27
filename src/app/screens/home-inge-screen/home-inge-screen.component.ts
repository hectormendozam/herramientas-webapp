import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';


@Component({
  selector: 'app-home-inge-screen',
  templateUrl: './home-inge-screen.component.html',
  styleUrls: ['./home-inge-screen.component.scss']
})
export class HomeIngeScreenComponent implements OnInit {

  public token : string = "";
  public lista_usuarios: any[] = [];

  displayedColumns: string[] = ['id_trabajador', 'nombre', 'email', 'fecha_nacimiento', 'edad', 'curp', 'rfc', 'telefono', 'ocupacion', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<DatosUsuario>(this.lista_usuarios as DatosUsuario[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    
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

  public goHomeInge(){
    this.router.navigate(["home-inge"]);
  }

      //Funcion para editar
      public goEditar(idUser: number){
        this.router.navigate(["registro/"+idUser]);
      }
  
    //Función para eliminar
    public delete(idUser: number){
      console.log("User:", idUser);
      const dialogRef = this.dialog.open(EliminarUserModalComponent,{
        data: {id: idUser}, //Se pasan valores a través del componente
        height: '268px',
        width: '328px',
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result.isDelete){
          console.log("Usuario eliminado");
          //Recargar página
          window.location.reload();
        }else{
          alert("Usuario no eliminado ");
          console.log("No se eliminó el usuario");
          //alert("No se eliminó el usuario");
        }
      });
    }
  }//Aquí cierra la clase principal

  export interface DatosUsuario {
    id: number,
    matricula: number;
    first_name: string;
    last_name: string;
    email: string;
    fecha_nacimiento: string,
    curp: string,
    rfc: string,
    edad: number,
    telefono: string,
    ocupacion: string
    }