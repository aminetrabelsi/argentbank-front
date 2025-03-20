import { Navigate } from "react-router";
import PropTypes from "prop-types";

import { useAuth } from "/src/store/hooks";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    auth.setToken(token);
  }
  if (!token && !auth.token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
