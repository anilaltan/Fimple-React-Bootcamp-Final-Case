import { useContext, createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import UserService from "../services/user.service";

const TicketsContext = createContext();

export const TicketsProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await UserService.getPublicContent();
      setTickets(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTicketByTicketNo = async (basvuruNo) => {
    try {
      setLoading(true);
      const ticket = await UserService.getTicketByTicketNo(basvuruNo);
      return ticket.data;
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTicket = async (ticketNo, status, response) => {
    try {
      setLoading(true);
      await UserService.updateTicket(ticketNo, status, response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const values = { tickets, loading, updateTicket, getTicketByTicketNo };

  return (
    <TicketsContext.Provider value={values}>{children}</TicketsContext.Provider>
  );
};

TicketsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTickets = () => useContext(TicketsContext);
