import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  public userName: string;
  public password: string;
  public email: string;

  ngOnInit() {
  }

  public login() {
    console.log("log!!")
    const user = { UserName: this.userName, Password: this.password, Email: this.email };
    this.loginService.login(user).subscribe((key: string) => {
      console.log(key);
    })
  }

}
