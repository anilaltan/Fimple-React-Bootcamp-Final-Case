import { useContext, createContext, useState } from "react";
import PropTypes from "prop-types";
import AuthService from "../services/auth.service";
import { redirect } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("user-token") || null)
  );
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const loginUser = async (username, password) => {
    try {
      setLoading(true);
      const isLogin = await AuthService.login(username, password);
      setLoginError(isLogin);
      setToken(JSON.parse(localStorage.getItem("user-token")));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      setLoading(true);
      await AuthService.logout();
      setToken(null);
      redirect("/admin");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const values = { token, loginUser, logoutUser, loading, loginError };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
