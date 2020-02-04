import { observable, action } from "mobx"

import { signup, signin } from "../api/auth.api";
import { SignUpInterface, SignInInterface } from "../models/auth.model";

interface User {
  login?: string;
  email?: string;
  avatar?: string;
}

export default class AuthStore {
  @observable isLoggedIn: boolean = false;
  @observable user: User | null = null;

  @action toggleIsLoggedIn() {
    this.isLoggedIn = !this.isLoggedIn
  }

  @action initialize() {
    const token = localStorage.getItem("token");

    if (!token) alert('notoken')
    else alert('token')
  }

  @action async signUp(signUpData: SignUpInterface) {
    try {
      const { user, token } = await signup(signUpData);
      localStorage.setItem("token", token);
      this.isLoggedIn = true;
      this.user = user;
    } catch (err) {
      throw err;
    }
  }

  @action async signIn(signInData: SignInInterface) {
    try {
      const user = await signin(signInData);
      this.isLoggedIn = true;
      this.user = user;
    } catch (err) {
      throw err;
    }
  }

  @action logout() {
    this.isLoggedIn = false;
  }
}
