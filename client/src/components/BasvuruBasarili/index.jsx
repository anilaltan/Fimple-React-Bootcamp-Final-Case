import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import styles from "./styles.module.css";
import { BsCopy } from "react-icons/bs";
import { CiSquareCheck } from "react-icons/ci";
import NoMatch from "../NoMatch";

const BasvuruBasarili = () => {
  const location = useLocation();
  const [isCopy, setIsCopy] = useState(false);
  const { state } = location;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(state.basvuruNo);
    setIsCopy(true);
  };

  return (
    <>
      {!state && <NoMatch />}
      {state && (
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.checkMarkContainer}>
              <i className={styles.checkMark}>✓</i>
            </div>
            <h1 className={styles.success}>Başarılı</h1>
            <p className={styles.text}>
              Basvurunuz başarılı bir şekilde oluşturuldu <br />
              Kısa bir süre içinde temas kuracağız!
            </p>
            <div style={{ marginTop: "10px" }}>
              <p
                className={styles.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Başvurunuzu&nbsp;
                <span
                  style={{
                    color: "#f25042",
                    cursor: "pointer",
                  }}
                  onClick={copyToClipboard}
                >
                  {state.basvuruNo}
                </span>
                &nbsp;
                {!isCopy ? (
                  <BsCopy
                    style={{
                      color: "#f25042",
                      cursor: "pointer",
                    }}
                    onClick={copyToClipboard}
                  />
                ) : (
                  <CiSquareCheck
                    style={{
                      color: "#f25042",
                      cursor: "pointer",
                    }}
                    onClick={copyToClipboard}
                  />
                )}
                &nbsp;kodu ile
                <Link to="/basvuru-sorgula" className={styles.link}>
                  &nbsp;Başvuru Sorgula&nbsp;
                </Link>
                sayfasından takip edebilirsiniz
              </p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.contentContainer}>
              <div className={styles.inlineContainer}>
                <span className={styles.header}>İsim</span>
                <span className={styles.infoText}>{state.ticket.name}</span>
              </div>
              <div className={styles.inlineContainer}>
                <span className={styles.header}>Soyad</span>
                <span className={styles.infoText}>{state.ticket.surname}</span>
              </div>
            </div>

            <div className={styles.contentContainer}>
              <div className={styles.inlineContainer}>
                <span className={styles.header}>Yaş</span>
                <span className={styles.infoText}>{state.ticket.age}</span>
              </div>
              <div className={styles.inlineContainer}>
                <span className={styles.header}>TC</span>
                <span className={styles.infoText}>{state.ticket.TC}</span>
              </div>
            </div>

            <div
              className={styles.contentContainer}
              style={{ flexDirection: "column" }}
            >
              <span className={styles.header}>Adres</span>
              <span className={styles.infoText}>{state.ticket.address}</span>
            </div>

            <div
              className={styles.contentContainer}
              style={{ flexDirection: "column" }}
            >
              <span className={styles.header}>Başvuru Nedeni</span>
              <span className={styles.infoText}>
                {state.ticket.basvuruNedeni}
              </span>
            </div>

            {state.ticket.photos.length > 0 ? (
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
                  {state.ticket.photos.map((photo) => (
                    <img
                      key={photo.publicId}
                      src={photo.imageUrl}
                      style={{ maxWidth: "300px", marginBottom: "5px" }}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default BasvuruBasarili;
