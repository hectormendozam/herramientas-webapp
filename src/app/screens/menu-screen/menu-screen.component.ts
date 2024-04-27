import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-screen',
  templateUrl: './menu-screen.component.html',
  styleUrls: ['./menu-screen.component.scss']
})
export class MenuScreenComponent {

  constructor(
    private router: Router,

  ) { }
  
ngOnInit(): void {}

public regresar(){
  this.router.navigate([""]);
}


public goAgenda(){                     
  this.router.navigate([]);
} 

public goDirectorioEmpresarial(){
  this.router.navigate(["directorio-emp"]);
}

public goDirectorioPersonal(){
  this.router.navigate([]);
}

}


