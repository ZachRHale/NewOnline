import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { registerUser } from '../models/registerUser.model';
import { RegisterUserService } from '../services/register-user.service';
import { Constants } from '../constants/global.const';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private registerService: RegisterUserService,
    private storageService: StorageService, private router: Router) { }
  public userName: string;
  public password: string;
  public email: string;

  public registerUserName: string;
  public registerPassword: string;
  public registerEmail: string;

  public registerErrors: { code: string, description: string }[];

  ngOnInit() {
  }

  public login() {
    const user = { UserName: this.userName, Password: this.password, Email: this.email };
    this.loginService.login(user).subscribe((response) => {
      if (response.token) {
        this.storageService.setJWT(response.token);
        this.router.navigate(['/myMetronomes'])
      } else {
        console.error(response.errors);
      }
    })
  }


  public register() {
    const newUser: registerUser = { 
      UserName: this.registerUserName, 
      Password: this.registerPassword, 
      Email: this.registerEmail
    };

    this.registerService.registerUser(newUser).subscribe(response => {
      if (response.token) {
        this.registerErrors = undefined;
        this.storageService.setJWT(response.token);
        this.router.navigate(['/myMetronomes'])
      } else if (response.errors) {
        this.registerErrors = response.errors;
      }
    })

  }

}
