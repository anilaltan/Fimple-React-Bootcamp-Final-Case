import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import UserService from "../../services/user.service";

const Basvuru = () => {
  const { basvuruNo } = useParams();
  const [ticket, setTicket] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTicketByTicketNo = async () => {
      try {
        setLoading(true);
        const ticket = await UserService.getTicketByTicketNo(basvuruNo);
        setTicket(ticket.data);
      } catch (error) {
        console.error("error:", error);
        setError("An error occurred while fetching the ticket.");
      } finally {
        setLoading(false);
      }
    };

    getTicketByTicketNo();
  }, [basvuruNo]);
  return (
    <div>
      Basvuru
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {!loading && <pre>{JSON.stringify(ticket)}</pre>}
    </div>
  );
};

export default Basvuru;
