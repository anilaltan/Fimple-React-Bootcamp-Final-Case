import "./App.css";
import { useTickets } from "./context/ticketContext";

function App() {
  const { tickets } = useTickets();
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {tickets.map((ticket) => (
          <div key={ticket._id}>
            <pre>{JSON.stringify(ticket)}</pre>
            <img src={ticket.photos[0].imageUrl} />
          </div>
        ))}

        {/* <img src="https://res.cloudinary.com/dc1o0mpub/image/upload/v1703613874/ticket-images/rb7s2velh7pxazevxm3y.webp" /> */}
      </div>
    </>
  );
}

export default App;
