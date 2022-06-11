import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DetachedRouteHandle, Router } from '@angular/router';
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
  fill = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {

  }

  public addUser: FormGroup = new FormGroup({
    firstname: new FormControl('', [
      Validators.required
    ], []),
    lastname: new FormControl('', [
      Validators.required
    ], []),
    email: new FormControl('', [
      Validators.required
    ], []),
    city: new FormControl('', [
      Validators.required
    ], []),
    street: new FormControl('', [
      Validators.required
    ], []),
    zipcode: new FormControl('', [
      Validators.required
    ], [])
  });


  /**
   * Save user at firestore as JSON
   */
  saveUser() {
    // this.user.birthDate = this.birthDate.getTime();
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
