import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Este import es para los servicios http
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';

//Pantallas
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { RegistroProductoScreenComponent } from './screens/registro-producto-screen/registro-producto-screen.component';

//Cambia el idioma a español
import { MAT_DATE_LOCALE } from '@angular/material/core';

//ngx mask
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { EliminarUserModalComponent } from './modals/eliminar-user-modal/eliminar-user-modal.component';
import { RegistroMateriaScreenComponent } from './screens/registro-materia-screen/registro-materia-screen.component';
import { TablaMateriaScreenComponent } from './screens/tabla-materia-screen/tabla-materia-screen.component';
import { EliminarMateriaModalComponent } from './modals/eliminar-materia-modal/eliminar-materia-modal.component';
import { RegistroIngeScreenComponent } from './screens/registro-inge-screen/registro-inge-screen.component';
import { HomeIngeScreenComponent } from './screens/home-inge-screen/home-inge-screen.component';
import { MenuScreenComponent } from './screens/menu-screen/menu-screen.component';
import { DirectorioEScreenComponent } from './screens/directorio-e-screen/directorio-e-screen.component';
import { RegistroContactoEScreenComponent } from './screens/registro-contacto-e-screen/registro-contacto-e-screen.component';
import { EliminarContactoeModalComponent } from './modals/eliminar-contactoe-modal/eliminar-contactoe-modal.component';
import { DirectorioPScreenComponent } from './screens/directorio-p-screen/directorio-p-screen.component';
import { RegistroContactoPScreenComponent } from './screens/registro-contacto-p-screen/registro-contacto-p-screen.component';
import { EliminarContactopModalComponent } from './modals/eliminar-contactop-modal/eliminar-contactop-modal.component';
import { AgendaScreenComponent } from './screens/agenda-screen/agenda-screen.component';
import { RegistroCitaScreenComponent } from './screens/registro-cita-screen/registro-cita-screen.component';
import { EliminarCitaModalComponent } from './modals/eliminar-cita-modal/eliminar-cita-modal.component';
//Options mask
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule
({
  declarations: 
  [
    AppComponent,
    LoginScreenComponent,
    RegistroScreenComponent,
    HomeScreenComponent,
    RegistroProductoScreenComponent,
    EliminarUserModalComponent,
    RegistroMateriaScreenComponent,
    TablaMateriaScreenComponent,
    EliminarMateriaModalComponent,
    RegistroIngeScreenComponent,
    HomeIngeScreenComponent,
    MenuScreenComponent,
    DirectorioEScreenComponent,
    RegistroContactoEScreenComponent,
    EliminarContactoeModalComponent,
    DirectorioPScreenComponent,
    RegistroContactoPScreenComponent,
    EliminarContactopModalComponent,
    AgendaScreenComponent,
    RegistroCitaScreenComponent,
    EliminarCitaModalComponent,
  ],
  imports: 
  [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgxMaskModule.forRoot(options),
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule
    ],
  providers:
  [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
  ],
  bootstrap:
  [
    AppComponent
  ]
})
export class AppModule { }
