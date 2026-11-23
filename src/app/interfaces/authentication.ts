export interface Authentication {

  init(): Promise<boolean>;

  login(): Promise<void>;

  logout(): Promise<void>;

  isAuthenticated(): boolean;

  getToken(): string | undefined;

  getUsername(): string | undefined;

  updateToken(): Promise<boolean>;
  getUser() : any | undefined

}