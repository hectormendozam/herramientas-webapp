import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EliminarContactoeModalComponent } from 'src/app/modals/eliminar-contactoe-modal/eliminar-contactoe-modal.component';
import { FacadeService } from 'src/app/services/facade.service';
import { ContactosempService } from 'src/app/services/contactosemp.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-directorio-e-screen',
  templateUrl: './directorio-e-screen.component.html',
  styleUrls: ['./directorio-e-screen.component.scss']
})
export class DirectorioEScreenComponent implements OnInit {
  public token : string = "";
  public lista_contactos: any[] = [];

  displayedColumns: string[] = ['nombre_empresa', 'giro', 'direccion_postal', 'representante_legal', 'telefono', 'correo_electronico', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<DatosContactosemp>(this.lista_contactos as DatosContactosemp[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  constructor(
    private facadeService: FacadeService,
    private contactosempService: ContactosempService,
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
    this.obtenerListaContactosEmp();

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
  public obtenerListaContactosEmp(){
    this.contactosempService.obtenerListaContactosEmp().subscribe(
      (response)=>{
        this.lista_contactos = response;
        console.log("Lista materias: ", this.lista_contactos);
        if(this.lista_contactos.length > 0){
          this.dataSource = new MatTableDataSource<DatosContactosemp>(this.lista_contactos as DatosContactosemp[]);
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
  public goEditar(idcontactoemp: number){
    this.router.navigate(["registro-contacto-e/"+idcontactoemp]);
  }

  public regresar(){
    this.location.back();
  }

  public goRegistroContactoe(){
    this.router.navigate(["registro-contacto-e"]);
  }

  public goHomeMaterias(){
    this.router.navigate(["home-materias"]);
  }

  //Función para eliminar
  public delete(idcontactoemp: number){
    console.log("User:", idcontactoemp);
    const dialogRef = this.dialog.open(EliminarContactoeModalComponent,{
      data: {id: idcontactoemp}, //Se pasan valores a través del componente
      height: '268px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Contacto eliminado");
        //Recargar página
        window.location.reload();
      }else{
        alert("Contacto no eliminado ");
        console.log("No se eliminó el contacto");
        //alert("No se eliminó el usuario");
      }
    });
  }

}//Aquí cierra la clase principal

//Esto va fuera de la llave que cierra la clase
export interface DatosContactosemp {
  id: number,
  nombre_empresa: number;
  giro: string;
  direccion_postal: string;
  representante_legal: string;
  telefono: string,
  correo_electronico: string
}