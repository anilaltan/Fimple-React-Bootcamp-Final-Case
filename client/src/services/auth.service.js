import axios from "axios";
import authHeader from "./auth-header";

const register = (username, password) => {
  return axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, {
    username,
    password,
  });
};

const login = async (username, password) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/users/login`,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.token) {
      localStorage.setItem("user-token", JSON.stringify(response.data.token));
    }
    return response.data;
  } catch (error) {
    console.error("login error from auth", error);
    return "Kullanıcı adı veya şifre hatalı";
  }
};

const logout = async () => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/users/me/logout`,
      null,
      { headers: authHeader() }
    );
    localStorage.removeItem("user-token");
  } catch (error) {
    console.error(error);
  }
};

const logoutAll = async () => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/users/me/logutall`,
      null,
      {
        headers: authHeader(),
      }
    );
    localStorage.removeItem("user-token");
  } catch (error) {
    console.error(error);
  }
};

const AuthService = {
  register,
  login,
  logout,
  logoutAll,
};

export default AuthService;
