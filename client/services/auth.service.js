import axios from "axios";
import authHeader from "./auth-header";

const register = (username, password) => {
  return axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, {
    username,
    password,
  });
};

const login = async (username, password) => {
  return await axios
    .post(`${import.meta.env.VITE_API_BASE_URL}/users/login`, {
      username: username,
      password: password,
    })
    .then(
      (response) => {
        if (response.data.token) {
          localStorage.setItem(
            "user-token",
            JSON.stringify(response.data.token)
          );
        }

        return response.data;
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
};

const logout = () => {
  return (
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/me/logout`, null, {
      headers: authHeader(),
    }),
    localStorage.removeItem("user-token")
  );
};
const logoutAll = () => {
  return (
    axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/users/me/logoutall`,
      null,
      {
        headers: authHeader(),
      }
    ),
    localStorage.removeItem("user-token")
  );
};

const getCurrentUser = () => {
  return axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
    headers: authHeader(),
  });
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  logoutAll,
};

export default AuthService;
