import { action, computed, makeAutoObservable, observable } from "mobx";

import ProfileService from "/src/services/profile";

export default class ProfileStore {
  firstName = "";
  lastName = "";

  constructor() {
    makeAutoObservable(this, {
      firstName: observable,
      lastName: observable,
      fullName: computed,
      fetchProfile: action,
      updateProfile: action,
      setFirstName: action,
      setLastName: action,
    });
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  async fetchProfile({ token }) {
    const data = await ProfileService.fetchProfile(token);
    this.setFirstName(data.firstName);
    this.setLastName(data.lastName);
  }

  async updateProfile(token, data) {
    const resp = await ProfileService.updateProfile(token, data);
    this.setFirstName(resp.firstName);
    this.setLastName(resp.lastName);
  }

  setFirstName(value) {
    this.firstName = value;
  }

  setLastName(value) {
    this.lastName = value;
  }
}
