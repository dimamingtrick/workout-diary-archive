import { observable, action } from "mobx"

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

  @action signIn() {
    console.log("SignIn");
    this.isLoggedIn = true;
  }

  @action logout() {
    this.isLoggedIn = false;
  }
}
