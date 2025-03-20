import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/user/";

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.status === 200) {
        return response.data.body.token;
      }
      throw new Error(response.data.message);
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const getCurrentToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

const AuthService = {
  login,
  logout,
  getCurrentUser: getCurrentToken,
};

export default AuthService;
