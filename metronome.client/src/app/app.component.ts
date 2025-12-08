import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService, LogoutOptions } from '@auth0/auth0-angular';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
  ],
})
export class AppComponent implements OnInit {
  public isLoading: boolean = true;
  public isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        this.isLoading = false;
        this.isLoggedIn = false;
      } else {
        this.auth.getAccessTokenSilently().subscribe({
          next: (token) => {
            this.isLoading = false;
            this.isLoggedIn = true;
          },
          error: (error) => {
            this.isLoading = false;
            this.isLoggedIn = false;
          },
        });
      }
    });
  }

  navigate(path: string) {
    this.router.navigate([path]);
    // Navigation logic can be implemented here
  }

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    const options: LogoutOptions = {
      logoutParams: { returnTo: window.location.origin },
    };
    this.auth.logout(options).subscribe();
  }
}
