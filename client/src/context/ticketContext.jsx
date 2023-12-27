import { useContext, createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const TicketsContext = createContext();

export const TicketsProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const res = await fetch("https://ticket-manager.adaptable.app/basvuru");
      const data = await res.json();
      console.log(data);
      setTickets(data);
    };

    fetchTickets();
  }, []);

  const values = { tickets, setTickets };

  return (
    <TicketsContext.Provider value={values}>{children}</TicketsContext.Provider>
  );
};

TicketsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useTickets = () => useContext(TicketsContext);
