import { useTickets } from "../../context/ticketContext";
import { Link } from "react-router-dom";

const BasvuruListesi = () => {
  const { tickets, loading } = useTickets();

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && (
        <div
          style={{
            maxWidth: "900px",
            margin: "auto",
            background: "#eaddcf",
            width: "100%",
          }}
        >
          {tickets.length}
          {tickets.map((ticket) => (
            <div key={ticket._id}>
              <h1>{ticket.basvuruNedeni}</h1>
              {ticket.photos.length > 0
                ? ticket.photos.map((photo) => (
                    <img
                      src={photo.imageUrl}
                      key={photo.publicId}
                      style={{ maxWidth: "100px" }}
                    />
                  ))
                : null}

              <Link to={`/admin/basvuru/${ticket._id}`}>
                <h3>{ticket._id}</h3>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BasvuruListesi;
