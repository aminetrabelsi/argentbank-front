import { makeAutoObservable } from "mobx";

import AuthStore from "./AuthStore";
import ProfileStore from "./ProfileStore";

export default class RootStore {
  constructor() {
    this.authStore = new AuthStore();
    this.profileStore = new ProfileStore();

    makeAutoObservable(this);
  }
}
