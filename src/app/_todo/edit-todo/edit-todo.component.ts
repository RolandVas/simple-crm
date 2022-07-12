import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { doc } from 'firebase/firestore';
import { ToDoData } from 'src/app/_interface/tododata';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

  @Input() ToDo$: ToDoData;
  ID: any;

  constructor(public dialogRef: MatDialogRef<EditTodoComponent>, private firestore: AngularFirestore) {     
  }

  ngOnInit(): void {
    console.log(this.ToDo$.customIdName) 
  }

  public addToDo: FormGroup = new FormGroup({
    task: new FormControl('', [
      Validators.required
    ], [])
  });

  updateTodo() {
    console.log(this.ToDo$.customIdName) 
    this.firestore 
    .collection('todo')/* gespeicherte Daten aus firestore user collection werden geladen */
    .doc(this.ToDo$.customIdName)
    .update(this.ToDo$)
    .then((changes: any) => {
      this.dialogRef.close()
      console.log('todo update', changes)
      
    })
  }

}
