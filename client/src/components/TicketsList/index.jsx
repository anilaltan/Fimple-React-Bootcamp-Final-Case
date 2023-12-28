import { useTickets } from "../../context/ticketContext";

const TicketsList = () => {
  const { tickets, loading } = useTickets();
  return (
    <div className="container">
      {loading && <div>Loading...</div>}
      {!loading && (
        <div className="jumbotron">
          {tickets.length}
          {tickets.map((ticket) => (
            <div key={ticket._id}>
              <h1>{ticket.basvuruNedeni}</h1>
              <img
                src={ticket.photos[0].imageUrl}
                style={{ maxWidth: "1000px" }}
              />
            </div>
          ))}
        </div>
      )}

      {/* <img src="https://res.cloudinary.com/dc1o0mpub/image/upload/v1703613874/ticket-images/rb7s2velh7pxazevxm3y.webp" /> */}
    </div>
  );
};

export default TicketsList;
