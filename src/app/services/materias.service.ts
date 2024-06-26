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
export class MateriasService {

  constructor(
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private http: HttpClient,
    private facadeService: FacadeService
  ) { }

  public esquemaMateria(){
    return {
      'nrc': '',
      'nombre_materia': '',
      'seccion': '',
      'dias': '',
      'hora_inicio': '',
      'hora_final': '',
      'salon': '',
      'programa_educativo': '',
    }
  }

  //Función para validar datos del usuario
  public validarMateria(data: any, editar: boolean){    
    console.log("Validando materia... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["nrc"])){
      error["nrc"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["nrc"])){
      error["nrc"] = this.errorService.numeric;
    } 

    if(!this.validatorService.required(data["nombre_materia"])){
      error["nombre_materia"] = this.errorService.required;
    }else if(!this.validatorService.max(data["nombre_materia"], 40)){
      error["nombre_materia"] = this.errorService.max(40);
    }

    if(!this.validatorService.required(data["seccion"])){
      error["seccion"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["seccion"])){
      error["seccion"] = this.errorService.numeric;
    }

    if(!this.validatorService.required(data["dias"])){
      error["dias"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["hora_inicio"])){
      error["hora_inicio"] = this.errorService.required;
    } 

    if(!this.validatorService.required(data["hora_final"])){
      error["hora_final"] = this.errorService.required;
    } 

    if(!this.validatorService.required(data["salon"])){
      error["salon"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["programa_educativo"])){
      error["programa_educativo"] = this.errorService.required;
    }

    return error;
  }

   // Aqui se agregan servicios http
     // Servicio para registrar nueva materia
  public registrarMateria (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/materias/`,data, httpOptions);
  }

    //Lista de materias
    public obtenerListaMaterias(): Observable <any>{
      var token = this.facadeService.getSessionToken();
      var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
      return this.http.get<any>(`${environment.url_api}/lista-materias/`, {headers:headers});
    }

    //Obtener una sola materia dependiendo su ID
    public getMateriaByID(idMateria: Number){
      return this.http.get<any>(`${environment.url_api}/materias/?id=${idMateria}`,httpOptions); 
    }

      //Servicio para actualizar una materia
  public editarMateria (data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.put<any>(`${environment.url_api}/materias-edit/`, data, {headers:headers});
  }

    //Eliminar materia
    public eliminarMateria(idMateria: number): Observable <any>{
      var token = this.facadeService.getSessionToken();
      var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
      return this.http.delete<any>(`${environment.url_api}/materias-edit/?id=${idMateria}`,{headers:headers});
    }
}
