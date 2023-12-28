import { useContext, createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import UserService from "../../services/user.service";

const TicketsContext = createContext();

export const TicketsProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const res = await UserService.getPublicContent();
        setTickets(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getTickets();
  }, []);

  const values = { tickets, setTickets, loading };

  return (
    <TicketsContext.Provider value={values}>{children}</TicketsContext.Provider>
  );
};

TicketsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useTickets = () => useContext(TicketsContext);
