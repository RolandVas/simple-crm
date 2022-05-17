import { Component, OnInit } from '@angular/core';
import { DetachedRouteHandle } from '@angular/router';
import { user } from 'src/models/user.class';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  user = new user;
  birthDate: Date;

  constructor() { }

  ngOnInit(): void {
  }


  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('user:', this.user)
  }

}
