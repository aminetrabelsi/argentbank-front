import { createContext } from "react";
import PropTypes from "prop-types";

import AuthStore from "./AuthStore";
import ProfileStore from "./ProfileStore";

class RootStore {
  constructor() {
    this.authStore = new AuthStore(this);
    this.profileStore = new ProfileStore(this);
  }
}

const StoreContext = createContext(new RootStore());

const RootStoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={new RootStore()}>
      {children}
    </StoreContext.Provider>
  );
};
RootStoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { RootStoreProvider, StoreContext };
