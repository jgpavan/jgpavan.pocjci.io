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
  userName = '';
  roomCode: any;
  id: any;
  stamp: any;
  constructor(private db: AngularFireDatabase, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const encrypted = "MjE0NjYzMTY2MDA0MzQ0Ng==";
    let decrypted = atob(encrypted);
    console.log(decrypted);
    var ts = Math.round((new Date()).getTime() / 1000);
    console.log(ts);
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.stamp = this.activatedRoute.snapshot.paramMap.get('stmp');
    console.log(this.id);
    console.log(this.stamp);
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
    // let decryptedURL = window.location.href;
    // const urlValue = decryptedURL.toString().replace(/\//g, '&');
    // const finalURL = new URLSearchParams(urlValue);
    // const id = finalURL.get('id');
    // const stamp = finalURL.get('stmp');
    // console.log(stamp);
    let unix_timestamp = 17777;
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    console.log(formattedTime);
    // console.log(id);
    const userCopy: any = this.getUsers.find((item => item.id === this.id));
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