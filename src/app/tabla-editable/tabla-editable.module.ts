import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaEditableRoutingModule } from './tabla-editable-routing.module';
import { TablaComponent } from './tabla/tabla.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HeaderDialogComponent } from './dialog/header-dialog/header-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
@NgModule({
  declarations: [ TablaComponent, HeaderDialogComponent ],
  imports: [
      CommonModule,
      TablaEditableRoutingModule,
      MaterialModule,
      DragDropModule,
      ReactiveFormsModule
  ],
    entryComponents: [ HeaderDialogComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class TablaEditableModule { }
