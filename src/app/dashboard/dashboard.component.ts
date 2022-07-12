import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {MatDialog,} from '@angular/material/dialog';
import { AddTodoComponent } from '../_todo/add-todo/add-todo.component';
import { ToDoData } from 'src/app/_interface/tododata';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {


  allToDos: any = [];

  public sub = new Subscription();

  constructor(
    public dialog: MatDialog,  
    private firestore: AngularFirestore,
    private _dragulaService: DragulaService
    ) { 
      this._dragulaService.createGroup('todos', {
        removeOnSpill: false /* wenn man was aus der container ziht wird es nicht verschwinden */
      });

      this.sub.add(_dragulaService.drop('todos')
      .subscribe(({ el }) => {
        console.log(el);
      })
      );
    }

  ngOnInit(): void {

    this.firestore 
      .collection('todo')/* gespeicherte Daten aus firestore user collection werden geladen */
      .valueChanges({idField: 'customIdName'}) /* alle änderungen werden gespeichert / customIdName ID von jeder collection */
      .subscribe((changes: any) => {
        console.log('recived changes from DB', changes)
        this.allToDos = changes; 
      })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openDialog() {
    this.dialog.open(AddTodoComponent)
  }

}
