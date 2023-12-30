import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import Loading from "../Loading";
import NoMatch from "../NoMatch";
import styles from "./styles.module.css";

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
    <>
      {loading && (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      )}

      {error && <NoMatch />}

      {!loading && (
        <div className={styles.mainContainer}>
          <div className={styles.container}>
            <div className={styles.infoCard}>
              <div className={styles.contentContainer}>
                <div className={styles.inlineContainer}>
                  <span className={styles.header}>İsim</span>
                  <span className={styles.infoText}>{ticket.name}</span>
                </div>
                <div className={styles.inlineContainer}>
                  <span className={styles.header}>Soyad</span>
                  <span className={styles.infoText}>{ticket.surname}</span>
                </div>
              </div>

              <div className={styles.contentContainer}>
                <div className={styles.inlineContainer}>
                  <span className={styles.header}>Yaş</span>
                  <span className={styles.infoText}>{ticket.age}</span>
                </div>
                <div className={styles.inlineContainer}>
                  <span className={styles.header}>TC</span>
                  <span className={styles.infoText}>{ticket.TC}</span>
                </div>
              </div>

              <div
                className={styles.contentContainer}
                style={{ flexDirection: "column" }}
              >
                <span className={styles.header}>Adres</span>
                <span
                  className={styles.infoText}
                  style={{ marginBottom: "5px" }}
                >
                  {ticket.address}
                </span>
              </div>

              <div
                className={styles.contentContainer}
                style={{ flexDirection: "column" }}
              >
                <span className={styles.header}>Başvuru Nedeni</span>
                <span
                  className={styles.infoText}
                  style={{ marginBlock: "5px" }}
                >
                  {ticket.basvuruNedeni}
                </span>
              </div>

              {ticket.photos.length > 0 ? (
                <div
                  className={styles.contentContainer}
                  style={{ flexDirection: "column" }}
                >
                  <span className={styles.header}>Fotoğraflar</span>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    {ticket.photos.map((photo) => (
                      <img
                        key={photo.publicId}
                        src={photo.imageUrl}
                        style={{
                          maxWidth: "300px",
                          marginBottom: "5px",
                          height: "auto",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.infoCard}>
              <div className={styles.contentContainer}>
                <div
                  className={styles.inlineContainer}
                  style={{ flexWrap: "wrap", justifyContent: "center" }}
                >
                  <span className={styles.header}>Başvuru Durumu</span>
                  <span className={styles.infoText}>{ticket.status}</span>
                </div>
              </div>

              <div
                className={styles.contentContainer}
                style={{ flexDirection: "column", width: "400px" }}
              >
                <span className={styles.header}>Cevaplar</span>
                <span
                  className={styles.infoText}
                  style={{ marginBlock: "5px" }}
                >
                  {ticket.response}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Basvuru;
