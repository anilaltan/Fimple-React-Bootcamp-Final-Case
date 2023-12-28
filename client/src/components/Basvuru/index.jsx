import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import UserService from "../../../services/user.service";
const Basvuru = () => {
  const { ticketNo } = useParams();
  const [ticket, setTicket] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Perform data fetching based on productId
    const getTicketByTicketNo = async () => {
      try {
        setLoading(true);
        const ticket = await UserService.getTicketByTicketNo(ticketNo);
        setTicket(ticket.data);
      } catch (error) {
        console.error("error:", error);
      } finally {
        setLoading(false);
      }
    };

    getTicketByTicketNo();
  }, [ticketNo]);
  return (
    <div>
      Basvuru
      {loading && <div>Loading...</div>}
      {!loading && <pre>{JSON.stringify(ticket)}</pre>}
    </div>
  );
};

export default Basvuru;
