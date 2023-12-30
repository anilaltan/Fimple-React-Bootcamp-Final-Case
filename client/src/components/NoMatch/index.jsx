import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const NoMatch = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timeoutId);
      navigate("/basvuru-olustur");
    }

    return () => clearInterval(timeoutId);
  }, [countdown]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.notFoundContainer}>
            <i className={styles.notFound}>404</i>
          </div>
          <h1 className={styles.failed}>Aradığınız Sayfa Bulunamadı</h1>
          <p className={styles.text}>
            {countdown} saniye sonra ana sayfaya yönlendirileceksiniz...
          </p>
        </div>
      </div>
    </>
  );
};

export default NoMatch;
