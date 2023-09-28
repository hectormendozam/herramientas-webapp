import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
  ) { }

  public esquemaProducto(){
    return {
      'id': '',
      'nombre_producto': '',
      'precio': '',
      'departamento': '',
    }
  }

  //Función para validar datos del usuario
  public validarProducto(data: any){
    console.log("Validando producto... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["id"])){
      error["id"] = this.errorService.required;
    }else if(!this.validatorService.min(data["id"], 13)){
      error["id"] = this.errorService.min(13);
      alert("La longitud de caracteres del ID es menor, deben ser 13");
    }else if(!this.validatorService.max(data["id"], 13)){
      error["id"] = this.errorService.max(13);
      alert("La longitud de caracteres del ID es mayor, deben ser 13");
    }

    if(!this.validatorService.required(data["nombre_producto"])){
      error["nombre_producto"] = this.errorService.required;
    }else if(!this.validatorService.min(data["nombre_producto"], 3)){
      error["nombre_producto"] = this.errorService.min(3);
      alert("La longitud de caracteres del nombre es menor, deben ser 3 mínimo");
    }else if(!this.validatorService.max(data["nombre_producto"], 20)){
      error["nombre_producto"] = this.errorService.max(20);
      alert("La longitud de caracteres del nombre es mayor, deben ser 20 máximo");
    }

    if(!this.validatorService.required(data["departamento"])){
      error["departamento"] = this.errorService.required;
    }else if(!this.validatorService.min(data["departamento"], 3)){
      error["departamento"] = this.errorService.min(3);
      alert("La longitud de caracteres del departamento es menor, deben ser 3 mínimo");
    }else if(!this.validatorService.max(data["departamento"], 20)){
      error["departamento"] = this.errorService.max(20);
      alert("La longitud de caracteres del departamento es mayor, deben ser 20 máximo");
    }

    if(!this.validatorService.required(data["precio"])){
      error["precio"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["precio"])){
      alert("El formato es solo números");
    }

    return error;
    
  }
}
