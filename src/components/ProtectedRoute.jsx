import { Navigate } from "react-router";
import PropTypes from "prop-types";

import { useAuth } from "/src/store/hooks";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  const localToken = JSON.parse(localStorage.getItem("token"));
  const sessionToken = JSON.parse(sessionStorage.getItem("token"));
  if (localToken) {
    auth.setToken(localToken);
  }
  if (sessionToken) {
    auth.setToken(sessionToken);
  }
  if (!localToken && !auth.token && !sessionToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
