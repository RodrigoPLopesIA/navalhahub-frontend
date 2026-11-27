import { Injectable, inject } from '@angular/core';
import { Authentication } from '../interfaces/authentication';
import { KeycloakService } from './keycloak-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly authService: Authentication = inject(KeycloakService);

  init(): Promise<boolean> {
    return this.authService.init();
  }

  login(): Promise<void> {
    return this.authService.login();
  }

  logout(): Promise<void> {
    return this.authService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  getToken(): string | undefined {
    return this.authService.getToken();
  }

  getUsername(): string | undefined {
    return this.authService.getUsername();
  }

  updateToken(): Promise<boolean> {
    return this.authService.updateToken();
  }
  getUser(): any | undefined {
    return this.authService.getUser()
  }

}