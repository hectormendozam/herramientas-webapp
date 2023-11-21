import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { EliminarMateriaModalComponent } from 'src/app/modals/eliminar-materia-modal/eliminar-materia-modal.component';

@Component({
  selector: 'app-tabla-materia-screen',
  templateUrl: './tabla-materia-screen.component.html',
  styleUrls: ['./tabla-materia-screen.component.scss']
})
export class TablaMateriaScreenComponent implements OnInit {
  public token : string = "";
  public lista_usuarios: any[] = [];

  displayedColumns: string[] = ['nrc', 'nombre_materia', 'seccion', 'dias', 'horario_inicio', 'horario_final', 'salon', 'programa_educativo'];
  dataSource = new MatTableDataSource<DatosMateria>(this.lista_usuarios as DatosMateria[]);

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
    //Mandar a ejecutar la función
      this.obtenerUsuarios();

      //Para paginador
      this.initPaginator();
  }
        //Para paginacion
  //Paginador para Agentes
  public initPaginator(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      //console.log("Paginator: ", this.dataSourceIngresos.paginator);
      //Modificar etiquetas del paginador a español
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    },500);
    //this.dataSourceIngresos.paginator = this.paginator;
  }

  //Obtener lista de usuarios
  public obtenerUsuarios(){
    this.usuariosService.obtenerListaUsers().subscribe(
      (response)=>{
        this.lista_usuarios = response;
        console.log("Lista users: ", this.lista_usuarios);
        if(this.lista_usuarios.length > 0){
          //Agregar datos del nombre e email
          this.lista_usuarios.forEach(usuario => {
            usuario.first_name = usuario.user.first_name;
            usuario.last_name = usuario.user.last_name;
            usuario.email = usuario.user.email;
          });
          console.log("Otro user: ", this.lista_usuarios);
          this.dataSource = new MatTableDataSource<DatosMateria>(this.lista_usuarios as DatosMateria[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de materias");
      }
    );
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

    //Funcion para editar
    public goEditar(idUser: number){
      this.router.navigate(["registro/"+idUser]);
    }

  //Función para eliminar
  public delete(idUser: number){
    console.log("User:", idUser);
    const dialogRef = this.dialog.open(EliminarMateriaModalComponent,{
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

  public goHome(){
    this.router.navigate(["home"]);
  }

} //Aqui termina la clase

  //Esto va fuera de la llave que cierra la clase
  export interface DatosMateria {
    nrc: number,
    nombre_materia: string;
    seccion: number;
    dias: string;
    hora_inicio: string;
    hora_final: string,
    salon: string,
    programa_educativo: string,
    }
