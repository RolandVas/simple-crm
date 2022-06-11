import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userID: any = '';
  User: user = new user(); /* mit objektorientiert */
  // user: any = {}; /* ohne objektorientierung */

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog, private router: Router) { }

  /**
   * get USER ID from URL
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userID = paramMap.get('id')
      console.log('User ID', this.userID)

      this.getUser();
    })
  }


  getUser(){
    this.firestore
    .collection('user')
    .doc(this.userID) /* aus der collection nur eine ID holen */
    .valueChanges()
    .subscribe((User: any) => {
      this.User = new user(User); /* mit objektorientierung */
      // this.user = user; /* ohne opjektorientierung */
      console.log('Retrieved user', this.User)
    })
  }

  deleteUser() {
    this.firestore
    .collection('user')
    .doc(this.userID)
    .delete()
    .then(() => {
      this.router.navigateByUrl('/user')
    })
  }



  openDialogUser() {
    const dialog = this.dialog.open(DialogEditUserComponent)
    dialog.componentInstance.User = new user(this.User.toJSON()); /* so kann man eine kopie von einem objekt erstellen = new user(this.User.toJSON()) */
    dialog.componentInstance.UserID = this.userID;
  }


}
