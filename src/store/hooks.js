import { useContext } from "react";
import { StoreContext } from "./Store";

const useStore = () => useContext(StoreContext);

const useAuth = () => {
  const { authStore } = useStore();
  return authStore;
};

const useProfile = () => {
  const { profileStore } = useStore();
  return profileStore;
};

export { useAuth, useProfile };
