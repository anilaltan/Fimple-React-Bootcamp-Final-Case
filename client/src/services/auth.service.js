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
    console.error(error);
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

// const login = async (username, password) => {
//   return await axios
//     .post(`${import.meta.env.VITE_API_BASE_URL}/users/login`, {
//       username: username,
//       password: password,
//     })
//     .then(
//       (response) => {
//         if (response.data.token) {
//           localStorage.setItem(
//             "user-token",
//             JSON.stringify(response.data.token)
//           );
//         }

//         return response.data;
//       },
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
// };

// const logout = async () => {
//   return (
//     await axios.post(
//       `${import.meta.env.VITE_API_BASE_URL}/users/me/logout`,
//       null,
//       {
//         headers: authHeader(),
//       }
//     ),
//     localStorage.removeItem("user-token")
//   );
// };
// const logoutAll = () => {
//   return (
//     axios.post(
//       `${import.meta.env.VITE_API_BASE_URL}/users/me/logoutall`,
//       null,
//       {
//         headers: authHeader(),
//       }
//     ),
//     localStorage.removeItem("user-token")
//   );
// };

// const getCurrentUser = () => {
//   return axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
//     headers: authHeader(),
//   });
// };

const AuthService = {
  register,
  login,
  logout,
  // getCurrentUser,
  logoutAll,
};

export default AuthService;
