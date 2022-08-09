import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
interface TenantList {
  TenantName: any;
  id: string;
  groupNumber: number;
  username: string;
}
@Component({
  selector: 'app-sdk',
  templateUrl: './sdk.component.html',
  styleUrls: ['./sdk.component.scss'],
})

export class SdkComponent implements OnInit {
  getUsers: TenantList[];
  userCopy: any = [];
  searchText;

  constructor(private db: AngularFireDatabase, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.db.list('TenantList').snapshotChanges().subscribe(data => {
      this.getUsers = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['id'] = item.key;
        this.getUsers.push(a as TenantList);
        this.userCopy.push(a as TenantList);
      });
      this.filterByID();
      console.log(this.getUsers);
    });
  }

  filterByID() {
    const userCopy: any = this.getUsers.find((item => item.id === "214663"));
    if (userCopy?.id && userCopy?.ListFBTenantIdModel) {
      if (typeof userCopy.ListFBTenantIdModel === "object") {
        userCopy.ListFBTenantIdModel = Object.values(userCopy.ListFBTenantIdModel);
      }
      this.userCopy = userCopy.ListFBTenantIdModel;
      const sortedArray = this.userCopy;
      sortedArray.sort((a: any, b: any) => a?.['TenantName'].localeCompare(b?.['TenantName']));
      console.log(sortedArray);
      this.getUsers = this.userCopy;
    }
    console.log(this.getUsers);
  }


  searchUser() {
    console.log("serch ", this.searchText);
    if (!this.searchText) {
      this.userCopy = this.getUsers;
      return;
    }
    this.userCopy = this.getUsers.filter(item => item.TenantName.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1);
    console.log(this.userCopy);
  }
}