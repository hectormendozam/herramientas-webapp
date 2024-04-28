import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FacadeService } from './facade.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ContactosempService {

  constructor(
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private http: HttpClient,
    private facadeService: FacadeService
  ) { }

  public esquemaUser(){
    return {
      'nombre_empresa': '',
      'giro': '',
      'direccion_postal': '',
      'representante_legal': '',
      'telefono': '',
      'correo_electronico': '',
    }
  }

  //Función para validar datos del usuario
  public validarContactosEmp(data: any, editar: boolean){    
    console.log("Validando user... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["nombre_empresa"])){
      error["nombre_empresa"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["giro"])){
      error["giro"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["direccion_postal"])){
      error["direccion_postal"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["representante_legal"])){
      error["representante_legal"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["telefono"])){
      error["telefono"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["correo_electronico"])){
      error["correo_electronico"] = this.errorService.required;
    }

    return error;
  }

   //Aquí van los servicios HTTP
  //Servicio para registrar un nuevo usuario
  public registrarContactoEmp (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/contactos/`,data, httpOptions);
  }

  public obtenerListaContactosEmp (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-contactos/`, {headers:headers});
  }

  //Obtener un solo contacto por su ID
  public getContactoByID(idcontactoemp: Number){
    return this.http.get<any>(`${environment.url_api}/contactos/?id=${idcontactoemp}`,httpOptions); 
  }

    //Servicio para actualizar un contacto empresarial
    public editarContactoemp (data: any): Observable <any>{
      var token = this.facadeService.getSessionToken();
      var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
      return this.http.put<any>(`${environment.url_api}/contactos-edit/`, data, {headers:headers});
    }

}