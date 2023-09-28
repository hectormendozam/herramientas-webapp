import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductosService } from 'src/app/services/productos.service';
declare var $:any;

@Component({
  selector: 'app-registro-producto-screen',
  templateUrl: './registro-producto-screen.component.html',
  styleUrls: ['./registro-producto-screen.component.scss']
})
export class RegistroProductoScreenComponent implements OnInit {

  //Aquí van las variables
  public editar:boolean = false;
  public producto: any = {};
  //Para detectar errores
  public errors:any ={};


  constructor(
    private location: Location,
    private productosService: ProductosService,
  ) { }

  ngOnInit(): void {
    this.producto = this.productosService.esquemaProducto();
    console.log("Producto: ", this.producto);
    
  }

  public regresar(){
    this.location.back();
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.productosService.validarProducto(this.producto);
    if(!$.isEmptyObject(this.errors)){
      //Pasa la validación y sale de la función
      return false;
    }
    alert("El producto ha sido registrado!");

  }
}
