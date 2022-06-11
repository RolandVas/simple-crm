import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {MatDialog,} from '@angular/material/dialog';
import { user } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user = new user();
  allUsers: any = [];

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }

  ngOnInit(): void { /* wird sofort ausgefürt sobald die Seite geladen ist. Dasselbe in onload() */
    this.firestore 
      .collection('user')/* gespeicherte Daten aus firestore user collection werden geladen */
      .valueChanges({idField: 'customIdName'}) /* alle änderungen werden gespeichert / customIdName ID von jeder collection */
      .subscribe((changes: any) => {
        console.log('recived changes from DB', changes)
        this.allUsers = changes; 
      })

  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent)
  }



}
