import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-eliminar-cita-modal',
  templateUrl: './eliminar-cita-modal.component.html',
  styleUrls: ['./eliminar-cita-modal.component.scss']
})
export class EliminarCitaModalComponent implements OnInit{

  constructor(
    public citasService: CitasService,
    private dialogRef: MatDialogRef<EliminarCitaModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log("Id contacto: ", this.data.id);
  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }
  
  public eliminarCita(){
    this.citasService.eliminarCita(this.data.id).subscribe(
      (response)=>{
        console.log(response);
        this.dialogRef.close({isDelete:true});
      }, (error)=>{
        this.dialogRef.close({isDelete:false});
      }
    );
  }
}
