import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, MatMenuModule, MatButtonModule, RouterModule],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  navigate(path: string) {
    this.router.navigate([path]);
    // Navigation logic can be implemented here
  }
}
