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
export class CitasService {

  
  constructor(
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private http: HttpClient,
    private facadeService: FacadeService
  ) { }

  public esquemaUser(){
    return {
      'nombre_persona': '',
      'fecha': '',
      'hora_inicio': '',
      'hora_fin': '',
      'lugar': '',
      'asunto': '',
    }
  }

  //Función para validar datos de la cita
  public validarCita(data: any, editar: boolean){    
    console.log("Validando cita... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["nombre_persona"])){
      error["nombre_persona"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["fecha"])){
      error["fecha"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["hora_inicio"])){
      error["hora_inicio"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["hora_fin"])){
      error["hora_fin"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["lugar"])){
      error["lugar"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["asunto"])){
      error["asunto"] = this.errorService.required;
    }

    return error;
  }

   //Aquí van los servicios HTTP
  //Servicio para registrar una nueva cita
  public registrarCita (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/cita/`,data, httpOptions);
  }

  public obtenerListaCita (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-cita/`, {headers:headers});
  }

  //Obtener una sola cita por su ID
  public getCitaByID(idcita: Number){
    return this.http.get<any>(`${environment.url_api}/cita/?id=${idcita}`,httpOptions); 
  }

  //Servicio para actualizar una cita
  public editarCita (data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.put<any>(`${environment.url_api}/cita-edit/`, data, {headers:headers});
  }

  //Eliminar contacto empresarial
  public eliminarCita(idcita: number): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.delete<any>(`${environment.url_api}/cita-edit/?id=${idcita}`,{headers:headers});
  }
  

}
