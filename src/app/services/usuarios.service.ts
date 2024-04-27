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
export class UsuariosService {

  constructor(
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private http: HttpClient,
    private facadeService: FacadeService
  ) { }

  public esquemaUser(){
    return {
      'first_name': '',
      'last_name': '',
      'id_trabajador': '',
      'hora_inicio': '',
      'hora_final': '',
      'puesto': '',
      'nombreusuario': '',
      'password': '',
      'confirmar_password': '',
    }
  }

  //Función para validar datos del usuario
  public validarUsuario(data: any, editar: boolean){    
    console.log("Validando user... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["first_name"])){
      error["first_name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["last_name"])){
      error["last_name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["id_trabajador"])){
      error["id_trabajador"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["hora_inicio"])){
      error["hora_inicio"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["hora_final"])){
      error["hora_final"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["puesto"])){
      error["puesto"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["nombreusuario"])){
      error["nombreusuario"] = this.errorService.required;
    }

    if(!editar){
      if(!this.validatorService.required(data["password"])){
        error["password"] = this.errorService.required;
      }
  
      if(!this.validatorService.required(data["confirmar_password"])){
        error["confirmar_password"] = this.errorService.required;
      }
    }

    return error;
  }

  // Aqui se agregan servicios http
  // Servicio para registrar nuevo usuario
  public registrarUsuario (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/users/`,data, httpOptions);
  }

    //Registrar
    public obtenerListaUsers (): Observable <any>{
      var token = this.facadeService.getSessionToken();
      var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
      return this.http.get<any>(`${environment.url_api}/lista-users/`, {headers:headers});
    }

      //Obtener un solo usuario dependiendo su ID
    public getUserByID(idUser: Number){
      return this.http.get<any>(`${environment.url_api}/users/?id=${idUser}`,httpOptions); 
    }

      //Servicio para actualizar un usuario
  public editarUsuario (data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.put<any>(`${environment.url_api}/users-edit/`, data, {headers:headers});
  }

    //Eliminar usuario
    public eliminarUsuario(idUser: number): Observable <any>{
      var token = this.facadeService.getSessionToken();
      var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
      return this.http.delete<any>(`${environment.url_api}/users-edit/?id=${idUser}`,{headers:headers});
    }
}