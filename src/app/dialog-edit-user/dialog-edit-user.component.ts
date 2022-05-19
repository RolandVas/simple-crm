import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { user } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  User!: user;
  loading = false;
  birthDate: any;
  UserID: any;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }



  saveUser() {
    this.loading = true;
    this.firestore
    .collection('user')
    .doc(this.UserID)
    .update(this.User.toJSON())
    .then(() => {

      this.dialogRef.close();
      this.loading = false;
    })

    
  }

}
