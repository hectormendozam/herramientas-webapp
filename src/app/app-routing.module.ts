import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { NuevoLoginScreenComponent } from './screens/nuevo-login-screen/nuevo-login-screen.component';
import { RegistroProductoScreenComponent } from './screens/registro-producto-screen/registro-producto-screen.component';
import { RegistroMateriaScreenComponent } from './screens/registro-materia-screen/registro-materia-screen.component';
import { TablaMateriaScreenComponent } from './screens/tabla-materia-screen/tabla-materia-screen.component';
import { RegistroIngeScreenComponent } from './screens/registro-inge-screen/registro-inge-screen.component';
import { HomeIngeScreenComponent } from './screens/home-inge-screen/home-inge-screen.component';
import { MenuScreenComponent } from './screens/menu-screen/menu-screen.component';  
import { DirectorioEScreenComponent } from './screens/directorio-e-screen/directorio-e-screen.component';
import { RegistroContactoEScreenComponent } from './screens/registro-contacto-e-screen/registro-contacto-e-screen.component';
import { DirectorioPScreenComponent } from './screens/directorio-p-screen/directorio-p-screen.component';
import { RegistroContactoPScreenComponent } from './screens/registro-contacto-p-screen/registro-contacto-p-screen.component';
import { AgendaScreenComponent } from './screens/agenda-screen/agenda-screen.component';
import { RegistroCitaScreenComponent } from './screens/registro-cita-screen/registro-cita-screen.component';

const routes: Routes = [
  // Aqui se agregan cada una de las rutas del proyecto
  {path : '', component: LoginScreenComponent, pathMatch: 'full'},
  {path : 'registro', component: RegistroScreenComponent, pathMatch: 'full'},
  {path: 'registro/:id', component: RegistroScreenComponent, pathMatch: 'full' },
  {path : 'home', component: HomeScreenComponent, pathMatch: 'full'},
  {path : 'nuevo-login', component: NuevoLoginScreenComponent, pathMatch: 'full'},
  {path : 'registro-producto', component: RegistroProductoScreenComponent, pathMatch: 'full'},
  {path : 'registro-materia', component: RegistroMateriaScreenComponent, pathMatch: 'full'},
  {path : 'tabla-materia', component: TablaMateriaScreenComponent, pathMatch: 'full'},
  {path : 'registro-materia/:id', component: RegistroMateriaScreenComponent, pathMatch: 'full'},
  {path : 'registro-inge', component: RegistroIngeScreenComponent, pathMatch: 'full'},
  {path : 'home-inge', component: HomeIngeScreenComponent, pathMatch: 'full'},
  {path : 'menu', component: MenuScreenComponent, pathMatch: 'full'},
  {path : 'directorio-e', component: DirectorioEScreenComponent, pathMatch: 'full'},
  {path : 'registro-contacto-e', component: RegistroContactoEScreenComponent, pathMatch: 'full'},
  {path : 'registro-contacto-e/:id', component: RegistroContactoEScreenComponent, pathMatch: 'full'},
  {path : 'directorio-p', component: DirectorioPScreenComponent, pathMatch: 'full'},
  {path : 'registro-contacto-p', component: RegistroContactoPScreenComponent, pathMatch: 'full'},
  {path : 'registro-contacto-p/:id', component: RegistroContactoPScreenComponent, pathMatch: 'full'},
  {path : 'agenda', component: AgendaScreenComponent, pathMatch: 'full'},
  {path : 'registro-cita', component: RegistroCitaScreenComponent, pathMatch: 'full'},
  {path : 'registro-cita/:id', component: RegistroCitaScreenComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
