import { observable, action } from "mobx"

import { signUp, signIn, initialize } from "../api/auth.api";
import { SignUpInterface, SignInInterface } from "../models/auth.model";

interface User {
  login?: string;
  email?: string;
  avatar?: string;
}

export default class AuthStore {
  @observable initialized: boolean = false;
  @observable initializationError: boolean = false;
  @observable isLoggedIn: boolean = false;
  @observable user: User | null = null;

  @action async initialize() {
    if (this.initializationError) {
      this.initializationError = false;
    }

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const { user } = await initialize();
        this.isLoggedIn = true;
        this.user = user;
        this.initialized = true;
      } catch (error) {
        console.log("Initialize error:", error);
        if (error.status !== 500) {
          localStorage.removeItem("token");
          this.initialized = true;
        } else {
          this.initializationError = true;
        }
      }
    } else {
      this.initialized = true;
    }
  }

  @action async signUp(signUpData: SignUpInterface) {
    try {
      const { user, token } = await signUp(signUpData);
      localStorage.setItem("token", token);
      this.isLoggedIn = true;
      this.user = user;
    } catch (error) {
      throw error;
    }
  }

  @action async signIn(signInData: SignInInterface) {
    try {
      const { user, token } = await signIn(signInData);
      localStorage.setItem("token", token);
      this.isLoggedIn = true;
      this.user = user;
    } catch (error) {
      throw error;
    }
  }

  @action logout() {
    localStorage.removeItem("token");
    this.isLoggedIn = false;
    this.user = null;
  }
}
