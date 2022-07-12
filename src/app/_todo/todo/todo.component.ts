import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ToDoData } from 'src/app/_interface/tododata';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input() toDo$!: ToDoData;

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  edit() {
    const dialog = this.dialog.open(EditTodoComponent)
    dialog.componentInstance.ToDo$ = this.toDo$
  }

  remove(){
    this.firestore
    .collection('todo')
    .doc(this.toDo$.customIdName)
    .delete()
    console.log('delete: ', this.toDo$.customIdName)
  }

}
