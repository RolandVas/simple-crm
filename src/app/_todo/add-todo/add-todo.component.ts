import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToDoData } from 'src/app/_interface/tododata';



@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  public ToDo$: ToDoData;

  constructor(public dialogRef: MatDialogRef<AddTodoComponent>, private firestore: AngularFirestore) {
    this.ToDo$ = {
      todo: '',
      status: true,
    }
   }

  ngOnInit(): void {
  }

  public addToDo: FormGroup = new FormGroup({
    task: new FormControl('', [
      Validators.required
    ], [])
  });

  saveTodo() {

    this.firestore
      .collection('todo') /* eine collection abonieren auf firestore */
      .add(this.ToDo$)
      .then((result: any) => {
        console.log('To Do save:', result)
        this.dialogRef.close();
      })
  }
  

}
