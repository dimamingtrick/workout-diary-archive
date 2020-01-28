import { observable, action } from "mobx"

interface User {
  login?: string;
  email?: string;
  avatar?: string;
}

class AuthStore {
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
    alert("SignIn")
  }
}

export default new AuthStore();
