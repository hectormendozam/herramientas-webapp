import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactopService } from 'src/app/services/contactop.service';

@Component({
  selector: 'app-eliminar-contactop-modal',
  templateUrl: './eliminar-contactop-modal.component.html',
  styleUrls: ['./eliminar-contactop-modal.component.scss']
})
export class EliminarContactopModalComponent implements OnInit{

  constructor(
    public contactopService: ContactopService,
    private dialogRef: MatDialogRef<EliminarContactopModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log("Id contacto: ", this.data.id);
  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }
  
  public eliminarContactoe(){
    this.contactopService.eliminarContactop(this.data.id).subscribe(
      (response)=>{
        console.log(response);
        this.dialogRef.close({isDelete:true});
      }, (error)=>{
        this.dialogRef.close({isDelete:false});
      }
    );
  }
}
