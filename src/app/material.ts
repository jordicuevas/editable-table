import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button'; 
import {MatTooltipModule} from '@angular/material/tooltip'; 
@NgModule({
   
  imports: [
      MatDialogModule, 
      MatTableModule,
      MatIconModule,
      MatMenuModule,
      MatFormFieldModule,
      MatToolbarModule,
      MatInputModule,
      MatButtonModule,
      MatTooltipModule
    
  ] ,
  exports: [ MatDialogModule, 
            MatTableModule, 
            MatIconModule, 
            MatMenuModule, 
            MatFormFieldModule, 
            MatToolbarModule, 
            MatInputModule, 
            MatButtonModule, 
            MatTooltipModule ]
})
export class MaterialModule { }
