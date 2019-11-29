import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { ReactiveFormsModule,  FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-header-dialog',
  templateUrl: './header-dialog.component.html',
  styleUrls: ['./header-dialog.component.scss']
})
export class HeaderDialogComponent implements OnInit {
    public form : FormGroup;
    public api: string;
    public name: string;
    public lastname: string;
    public id: number;
    @Output() onAdd = new EventEmitter<any>(true);

    constructor(
        public dialogRef: MatDialogRef<HeaderDialogComponent>,
        public fb: FormBuilder,
         public router: Router,
        public toasTer: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: MatDialog) {
        this.name = this.data['name'];
        this.form = fb.group({
            changeText : ['']
        })

    }

     
    sendNewName() {
        let data = this.form.controls['changeText'].value;
        if ( data !== null ) {
            let object = {
                old_name: this.name,
                new_name: data
            }
            this.onAdd.emit(object);
        } else {
            this.dialogRef.close();
        }

    }
    ngOnInit() {
    }

}
