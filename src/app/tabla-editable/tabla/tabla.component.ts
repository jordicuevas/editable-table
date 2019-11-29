import { CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import 'hammerjs';
import {HeaderDialogComponent} from '../dialog/header-dialog/header-dialog.component';
import {MatDialog} from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import {animate, state, style, transition, trigger} from "@angular/animations";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
    animations: [
        trigger("detailExpand", [
            state(
                "collapsed",
                style({ height: "0px", minHeight: "0", display: "none" })
            ),
            state("expanded", style({ height: "*" })),
            transition(
                "expanded <=> collapsed",
                animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
            )
        ])
    ]
})
export class TablaComponent implements OnInit {
   constructor(public dialog: MatDialog, public toaster: ToastrService) { }
   public showColumn = 'assets/tableFilters/show.png'
   public hideColumn = 'assets/tableFilters/hide.png'
   public columns: any[] = [];
   public columnsMenu: any[] = [];
   public displayedColumns: string[] = [];
   showHideColumns: any[] = [];
   public  ELEMENT_DATA: PeriodicElement[] = [];
   @ViewChild(MatSort, {static: true}) sort: MatSort;
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   public dataSource;
   public expandedElement = null;
   public claves;
   public newcolumns = [];
   public oldColumns = [];
    previousIndex: number;
    /**
     *
     * @param oldColumn
     * @param newColumn
     *  
     */
  getColumns(oldColumn, newColumn) {
      for ( let i = 0 ; i < this.ELEMENT_DATA.length; i++ ) {
          let o = this.ELEMENT_DATA[i];
          let old_name = oldColumn
          let new_name = newColumn;
          o[new_name] = o[old_name];
          delete o[old_name];
      }
   }
  ngOnInit() {
       this.ELEMENT_DATA = [
          {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
          {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
          {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
          {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
          {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
          {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
          {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
          {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
          {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
          {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
       ];
       /**
        *  OBTENEMOS EL ARRAY DE CLAVES Y SE GUARDA EN THIS.CLAVES
        */
        for ( let i = 0; i < this.ELEMENT_DATA.length ; i++ ) {
          this.claves = this.ELEMENT_DATA[i];
        }
       /**
        *  OBTENEMOS LAS COLUMNAS A MOSTRAR Y LAS GUARDAMOS EN NEWCOLUMNS
        *
        * */
       this.newcolumns = ['Posicion', 'Nombre', 'Peso', 'Símbolo'];
       /**
       * OBTENEMOS LAS COLUMNAS QUE VIENEN EN EL JSON Y LAS GUARDAMOS EN OLDCOLUMNS
       */
       this.oldColumns =  Object.keys(this.claves)
       /**
       * HACEMOS EL RECORRIDO PARA REEMPLAZAR LAS CLAVES DEL JSON PARA PODER MOSTRARLAS EN LA TABLA
       */
       for (  let i = 0; i <  this.newcolumns.length ; i++) {
           this.getColumns(this.oldColumns[i], this.newcolumns[i]);
       }

       this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
       this.dataSource.paginator = this.paginator;
       this.columns     = this.newcolumns;
      /**
       *
       * RECORREMOS EL ARRAY DE COLUMNAS PARA CARGAR EL MENU DE MOSTRAR Y OCULTAR COLUMNAS
       */
       let showHideColumns = [];
       for ( let i = 0; i < this.columns.length ; i++ ) {
           showHideColumns.push( { name: this.columns[i], visible: true});
       }
       this.columnsMenu = showHideColumns;
       /***********************************************************************************/
       this.dataSource.sort = this.sort;
       this.showHideColumns   =  this.columnsMenu;
       this.displayedColumns   =  this.columns;

  }

  dragStarted(event: CdkDragStart, index: number ) {
    this.previousIndex = index;
  }

  dropListDropped(event: CdkDropList, index: number) {
    if (event) {
      moveItemInArray(this.displayedColumns, this.previousIndex, index);
     }
  }
  showhideColumn(column, index ) {
    let exists  = this.displayedColumns.includes(column);
    if ( exists ) {
       this.displayedColumns.splice( this.displayedColumns.indexOf(column), 1);
       this.showHideColumns[index].visible = false;
    } else {
      this.showHideColumns[index].visible = true;
      this.displayedColumns.unshift(column);
    }

  }
  public openDialog(name) {
    let dialogRef = this.dialog.open(HeaderDialogComponent, {
      width: "550px",
      data: { name: name }
    });
    const sub = dialogRef.componentInstance.onAdd.subscribe((data: any) => {
      let exists = this.checkIfNameExits(data.new_name);
      if ( exists ) {
        this.toaster.error( 'Una columna con ese nombre ya existe!')
         return false;
      } else {
        // recorremos las columnas que se muestran en la tabla para cambiarle el nombre
        for ( let i = 0 ; i < this.displayedColumns.length ; i++ ) {
          if ( this.displayedColumns[i] === data.old_name ) {
            this.displayedColumns[i] = data.new_name;
          }
        }
        // recorremos las c olumnas del array del menu para mostrar ocultar
        for ( let i = 0 ; i < this.showHideColumns.length ; i++ ) {
          if ( this.showHideColumns[i].name === data.old_name ) {
            this.showHideColumns[i].name = data.new_name;
          }
        }
        let newOb = []
        for ( let i = 0 ; i < this.ELEMENT_DATA.length; i++ ) {
          let o = this.ELEMENT_DATA[i];
          let old_name = data.old_name
          let new_name = data.new_name;
          o[new_name] = o[old_name];
          delete o[old_name];
        }
      } // fin else

      });
  }
  checkIfNameExits(newName) {
     let exists = this.displayedColumns.includes(newName);
     return exists;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
