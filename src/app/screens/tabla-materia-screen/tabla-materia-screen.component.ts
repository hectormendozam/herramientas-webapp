import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { MatDialog } from '@angular/material/dialog';
import { EliminarMateriaModalComponent } from 'src/app/modals/eliminar-materia-modal/eliminar-materia-modal.component';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-tabla-materia-screen',
  templateUrl: './tabla-materia-screen.component.html',
  styleUrls: ['./tabla-materia-screen.component.scss']
})
export class TablaMateriaScreenComponent implements OnInit {
  public token : string = "";
  public lista_materias: any[] = [];
  public materias: boolean = false;

  displayedColumns: string[] = ['nrc', 'nombre_materia', 'seccion', 'dias', 'hora_inicio', 'hora_final', 'salon', 'programa_educativo', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<DatosMateria>(this.lista_materias as DatosMateria[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
    
    constructor(
      private facadeService: FacadeService,
      private materiasService: MateriasService,
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
      this.obtenerMaterias();

      //Para paginador
      this.initPaginator();
  }

  public removeSeconds(hora: string){
    let hora_final = hora.split(":");
    return hora_final[0] + ":" + hora_final[1];
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
  public obtenerMaterias(){
    this.materiasService.obtenerListaMaterias().subscribe(
      (response)=>{
        this.lista_materias = response;
        console.log("Lista materias: ", this.lista_materias);
        if(this.lista_materias.length > 0){
            this.dataSource = new MatTableDataSource<DatosMateria>(this.lista_materias as DatosMateria[]);
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
    public goEditar(idMateria: number){
      this.router.navigate(["registro-materia/"+idMateria]);
    }

  //Función para eliminar
  public delete(idMateria: number){
    console.log("Materia:", idMateria);
    const dialogRef = this.dialog.open(EliminarMateriaModalComponent,{
      data: {id: idMateria}, //Se pasan valores a través del componente
      height: '268px',
      width: '328px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Materia eliminada");
        //Recargar página
        window.location.reload();
      }else{
        alert("Materia no eliminada");
        console.log("No se eliminó la materia");
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
