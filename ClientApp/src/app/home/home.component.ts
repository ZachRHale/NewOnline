import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private userService: UserService) {
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe(response => {
      console.log(response);
    })
  }
}
