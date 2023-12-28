import { useContext, createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import AuthService from "../../services/auth.service";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // getCurrentUser fonksiyonunu çağır ve asenkron olarak kullanıcı bilgilerini al
        const response = await AuthService.getCurrentUser();
        // response.data içinde kullanıcı bilgileri olmalı
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
        // Hata durumunda kullanıcıyı null olarak ayarla veya başka bir işlem yapabilirsiniz
        setUser(null);
      } finally {
        // İstek tamamlandığında loading durumunu false olarak ayarla
        setLoading(false);
      }
    };

    // fetchCurrentUser fonksiyonunu çağır
    fetchCurrentUser();
  }, []);

  const values = { user, setUser, loading };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
