import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { DetachedRouteHandle } from '@angular/router';
import { user } from 'src/models/user.class';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  user = new user();
  birthDate: any;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }


  /**
   * Save user at firestore as JSON
   */
  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true

    this.firestore
      .collection('user') /* eine collection abonieren auf firestore */
      .add(this.user.toJSON())
      .then((result: any) => {
        this.loading = false
        console.log('User save:', result)
        this.dialogRef.close();
      })
  }

}
