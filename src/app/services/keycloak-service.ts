import { Injectable } from '@angular/core';
import { Authentication } from '../interfaces/authentication';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService implements Authentication {

  private readonly keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'navalha-hub-realm',
    clientId: 'navalhahub-frontend'
  });

  async init(): Promise<boolean> {
    return this.keycloak.init({
      onLoad: 'check-sso',
      pkceMethod: 'S256',
      checkLoginIframe: false
    });
  }

  async login(): Promise<void> {
    await this.keycloak.login({
      redirectUri: `${window.location.origin}/barbershops`
    });
  }

  async logout(): Promise<void> {
    await this.keycloak.logout({
      redirectUri: window.location.origin
    });
  }

  isAuthenticated(): boolean {
    return this.keycloak.authenticated ?? false;
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }

  getUsername(): string | undefined {
    return this.keycloak.tokenParsed?.['preferred_username'];
  }
  getUser(): any | undefined {
    return JSON.stringify(this.keycloak.tokenParsed)
  }

  async updateToken(): Promise<boolean> {
    return this.keycloak.updateToken(30);
  }

}