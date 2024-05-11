import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EliminarCitaModalComponent } from 'src/app/modals/eliminar-cita-modal/eliminar-cita-modal.component';
import { FacadeService } from 'src/app/services/facade.service';
import { CitasService } from 'src/app/services/citas.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agenda-screen',
  templateUrl: './agenda-screen.component.html',
  styleUrls: ['./agenda-screen.component.scss']
})
export class AgendaScreenComponent implements OnInit {
  public token : string = "";
  public lista_cita: any[] = [];

  displayedColumns: string[] = ['nombre_persona', 'fecha', 'hora_inicio', 'hora_fin', 'lugar', 'asunto', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<DatosCita>(this.lista_cita as DatosCita[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  constructor(
    private facadeService: FacadeService,
    private citasService: CitasService,
    private router: Router,
    public dialog: MatDialog,
    private location: Location
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
    this.obtenerListaCita();

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

  //Obtener lista de citas
  public obtenerListaCita(){
    this.citasService.obtenerListaCita().subscribe(
      (response)=>{
        this.lista_cita = response;
        console.log("Lista citas: ", this.lista_cita);
        if(this.lista_cita.length > 0){
          this.dataSource = new MatTableDataSource<DatosCita>(this.lista_cita as DatosCita[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de citas");
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
  public goEditar(idcita: number){
    this.router.navigate(["registro-cita/"+idcita]);
  }
  public regresar(){
    this.router.navigate(["menu"]);
  }

  public goRegistroCita(){
    this.router.navigate(["registro-cita"]);
  }

  public goHomeMaterias(){
    this.router.navigate(["home-materias"]);
  }

   //Función para eliminar
   public delete(idcita: number){
    console.log("User:", idcita);
    const dialogRef = this.dialog.open(EliminarCitaModalComponent,{
      data: {id: idcita}, //Se pasan valores a través del componente
      height: '268px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Cita eliminado");
        //Recargar página
        window.location.reload();
      }else{
        alert("Cita no eliminada ");
        console.log("No se eliminó la cita");
        //alert("No se eliminó el usuario");
      }
    });
  }

}//Aquí cierra la clase principal

//Esto va fuera de la llave que cierra la clase
export interface DatosCita {
  id: number,
  nombre_persona: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  lugar: string,
  asunto: string
}