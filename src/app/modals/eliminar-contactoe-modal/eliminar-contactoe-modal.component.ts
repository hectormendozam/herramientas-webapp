import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactosempService } from 'src/app/services/contactosemp.service';

@Component({
  selector: 'app-eliminar-contactoe-modal',
  templateUrl: './eliminar-contactoe-modal.component.html',
  styleUrls: ['./eliminar-contactoe-modal.component.scss']
})
export class EliminarContactoeModalComponent implements OnInit{

  constructor(
    public contactosempService: ContactosempService,
    private dialogRef: MatDialogRef<EliminarContactoeModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log("Id contacto: ", this.data.id);
  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }
  
  public eliminarContactoe(){
    this.contactosempService.eliminarContactoe(this.data.id).subscribe(
      (response)=>{
        console.log(response);
        this.dialogRef.close({isDelete:true});
      }, (error)=>{
        this.dialogRef.close({isDelete:false});
      }
    );
  }
}