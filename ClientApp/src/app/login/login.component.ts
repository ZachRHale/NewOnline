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
    const user = { UserName: this.userName, Password: this.password, Email: this.email };
    this.loginService.login(user).subscribe((key: { auth: string }) => {
      localStorage.setItem('authKey', JSON.stringify(key));
    })
  }

}
