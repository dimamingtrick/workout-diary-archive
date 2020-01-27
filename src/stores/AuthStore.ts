import { observable, action } from "mobx"

interface User {
  login?: string;
  email?: string;
  avatar?: string;
}

class AuthStore {
  @observable isLoggedIn: boolean = false;

  @action
  toggleIsLoggedIn() {
    this.isLoggedIn = !this.isLoggedIn
  }
}

export default new AuthStore();
