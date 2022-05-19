import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { user } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {

  User!: user;
  loading = false;
  UserID: any;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, private firestore: AngularFirestore) { }

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
