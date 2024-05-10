import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common';
import { ContactopService } from 'src/app/services/contactop.service';
import { EliminarContactopModalComponent } from 'src/app/modals/eliminar-contactop-modal/eliminar-contactop-modal.component';

@Component({
  selector: 'app-directorio-p-screen',
  templateUrl: './directorio-p-screen.component.html',
  styleUrls: ['./directorio-p-screen.component.scss']
})
export class DirectorioPScreenComponent implements OnInit {
  public token : string = "";
  public lista_contactop: any[] = [];

  displayedColumns: string[] = ['nombre_empresa', 'giro', 'direccion_postal', 'representante_legal', 'telefono', 'correo_electronico', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<DatosContactop>(this.lista_contactop as DatosContactop[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  constructor(
    private facadeService: FacadeService,
    private contactopService: ContactopService,
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
    this.obtenerListaContactop();

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
  public obtenerListaContactop(){
    this.contactopService.obtenerListaContactop().subscribe(
      (response)=>{
        this.lista_contactop = response;
        console.log("Lista contactos personales: ", this.lista_contactop);
        if(this.lista_contactop.length > 0){
          this.dataSource = new MatTableDataSource<DatosContactop>(this.lista_contactop as DatosContactop[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de contactos personales");
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
    this.router.navigate(["registro-contacto-p/"+idcontactoemp]);
  }

  public regresar(){
    this.router.navigate(["menu"]);
  }

  public goRegistroContactoP(){
    this.router.navigate(["registro-contacto-p"]);
  }

  public goHomeMaterias(){
    this.router.navigate(["home-materias"]);
  }

 //Función para eliminar
 public delete(idcontactoemp: number){
  console.log("User:", idcontactoemp);
  const dialogRef = this.dialog.open(EliminarContactopModalComponent,{
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
export interface DatosContactop {
  id: number,
  nombre_contacto: string;
  direccion_postal: string;
  correo_electronico: string;
  telefono_particular: string;
  telefono_celular: string,
  parentesco: string
}