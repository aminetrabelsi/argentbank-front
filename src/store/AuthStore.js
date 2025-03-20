import { action, makeAutoObservable, observable } from "mobx";

import AuthService from "/src/services/auth";

export default class AuthStore {
  token = null;

  constructor() {
    makeAutoObservable(this, {
      token: observable,
      login: action,
      logout: action,
      setToken: action,
    });
  }

  async login({ email, password, isRemembered }) {
    const tok = await AuthService.login(email, password);
    if (isRemembered) {
      localStorage.setItem("token", JSON.stringify(tok));
    }
    this.setToken(tok);
  }

  logout() {
    AuthService.logout();
    this.setToken(null);
  }

  setToken(value) {
    this.token = value;
  }
}
