import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { BsCopy } from "react-icons/bs";
import { CiSquareCheck } from "react-icons/ci";

const BasvuruBasarili = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(3);
  const [isCopy, setIsCopy] = useState(false);
  const { state } = location;

  useEffect(() => {
    if (!state) {
      const timeoutId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      if (countdown === 0) {
        clearInterval(timeoutId);
        navigate("/basvuru-olustur");
      }

      return () => clearInterval(timeoutId);
    }
  }, [countdown, state]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(state.basvuruNo);
    setIsCopy(true);
  };
  return (
    <>
      {!state && (
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.checkMarkContainer}>
              <i className={styles.checkMark} style={{ color: "#f25042" }}>
                404
              </i>
            </div>
            <h1 className={styles.success} style={{ color: "#f25042" }}>
              Aradığınız Sayfa Bulunamadı
            </h1>
            <p className={styles.text}>
              {countdown} saniye sonra ana sayfaya yönlendirileceksiniz...
            </p>
          </div>
        </div>
      )}
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

            {state.ticket.photos.length > 0
              ? state.ticket.photos.map((photo) => (
                  <div
                    className={styles.contentContainer}
                    style={{ flexDirection: "column" }}
                    key={photo.publicId}
                  >
                    <span className={styles.header}>Fotoğraflar</span>
                    <img src={photo.imageUrl} style={{ maxWidth: "100px" }} />
                  </div>
                ))
              : null}
          </div>
        </div>
      )}
    </>
  );
};

export default BasvuruBasarili;
