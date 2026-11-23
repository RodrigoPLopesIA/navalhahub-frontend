import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  authService = inject(AuthService)

  logout() : void {
    this.authService.logout()
  }
   getToken(): string | undefined{
    return this.authService.getToken()
  }
  getUsername(): string | undefined {
    return this.authService.getUsername()
  }
  getUser() {
    return this.authService.getUser()
  }
}
