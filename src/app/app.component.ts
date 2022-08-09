import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

const MIN_KEY_SIZE = 16;
const MAX_KEY_SIZE = 24;
const IV_ARRAY_SIZE = 16;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  endPoint = {
    url: "https://demo.kantech.com:8801/smartservice/Login",
    path_variables: "username=#username&password=#password&encrypted=#encrypted&SourceID=#SourceID&DateFormat=#DateFormat&TimeFormat=#TimeFormat&LocalDateTime=#LocalDateTime&ConnectedProgram=#ConnectedProgram",
  }

  loginDetail: any = {
    username: "entrapassdemo",
    password: "entrapassdemo",
    SourceID: "MOBILEAPP",
    encrypted: 1,
    LocalDateTime: "",
    ConnectedProgram: "",
    DateFormat: "yyyy-MM-dd",
    TimeFormat: "HH:mm:ss"
  }

  constructor(
    private datePipe: DatePipe,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.onLaunch();
  }

  onLaunch() {
    let url;
    if (this.loginDetail) {
      const dateFormat = encodeURIComponent(this.datePipe.transform(new Date(), "yyyy-MM-dd"));
      const timeFormat = encodeURIComponent(this.datePipe.transform(new Date(), "HH:mm:ss"));
      this.loginDetail.LocalDateTime = dateFormat + "+" + timeFormat;
      url = this.endPoint.url + "?" + this.endPoint.path_variables;
      for (const [key, value] of Object.entries(this.loginDetail)) {
        url = url.replace("#" + key, value);
      }
    }
    console.log("url ", url)
    this.http.get<any>(url).subscribe(data => {
      console.log("data ", data);
    }, error => {
      console.log("error ", error);
    });

    const encrypted = "NTQ5JjA4LzAxLzIwMjIxMjozMToyNQ==";
    let decrypted = atob(encrypted);
    console.log(decrypted);
  }
}






