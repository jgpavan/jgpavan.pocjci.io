import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
interface users {
  id: number;
  username: string;
}
@Component({
  selector: 'app-sdk',
  templateUrl: './sdk.component.html',
  styleUrls: ['./sdk.component.scss'],
})

export class SdkComponent implements OnInit {
  getUsers: users[];
  userCopy: any = [];
  searchText;

  constructor(private db: AngularFireDatabase, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.db.list('users').snapshotChanges().subscribe(data => {
      this.getUsers = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['id'] = item.key;
        this.getUsers.push(a as users);
        // this.userCopy.push(a as users)
      })
      this.userCopy = this.getUsers;
      console.log("user copy ", this.userCopy);
    });
  }

  searchUser() {
    console.log("serch ", this.searchText);
    if (!this.searchText) {
      this.userCopy = this.getUsers;
      return;
    }
    this.userCopy = this.getUsers.filter(item => item.username.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1);
    console.log(this.userCopy);
  }
}