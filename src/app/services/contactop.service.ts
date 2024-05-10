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
export class ContactopService {

  constructor(
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private http: HttpClient,
    private facadeService: FacadeService
  ) { }

  public esquemaUser(){
    return {
      'nombre_contacto': '',
      'direccion_postal': '',
      'correo_electronico': '',
      'telefono_particular': '',
      'telefono_celular': '',
      'parentesco': '',
    }
  }

  //Función para validar datos del usuario
  public validarContactop(data: any, editar: boolean){    
    console.log("Validando user... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["nombre_contacto"])){
      error["nombre_contacto"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["direccion_postal"])){
      error["direccion_postal"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["correo_electronico"])){
      error["correo_electronico"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["telefono_particular"])){
      error["telefono_particular"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["telefono_celular"])){
      error["telefono_celular"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["parentesco"])){
      error["parentesco"] = this.errorService.required;
    }

    return error;
  }

   //Aquí van los servicios HTTP
   //Servicio para registrar un nuevo contacto personal
   public registrarContactop (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/contactop/`,data, httpOptions);
  }

  public obtenerListaContactop (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-contactop/`, {headers:headers});
  }

  //Obtener un solo contacto por su ID
  public getContactopByID(idcontactop: Number){
    return this.http.get<any>(`${environment.url_api}/contactop/?id=${idcontactop}`,httpOptions); 
  }

  //Servicio para actualizar un contacto empresarial
  public editarContactop (data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.put<any>(`${environment.url_api}/contactop-edit/`, data, {headers:headers});
  }

  //Eliminar contacto empresarial
  public eliminarContactop(idcontactop: number): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.delete<any>(`${environment.url_api}/contactop-edit/?id=${idcontactop}`,{headers:headers});
  }
}
