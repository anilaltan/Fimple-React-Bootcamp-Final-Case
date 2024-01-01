import { useTickets } from "../../context/ticketContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import Loading from "../Loading";
import styles from "./styles.module.css";

const BasvuruListesi = () => {
  const { tickets, loading } = useTickets();
  const options = { year: "numeric", month: "numeric", day: "numeric" };

  const [sortConfigs, setSortConfigs] = useState({
    _id: { key: "_id", direction: "ascending" },
    name: { key: "name", direction: "ascending" },
    createdAt: { key: "createdAt", direction: "ascending" },
    status: { key: "status", direction: "ascending" },
    response: { key: "response", direction: "ascending" },
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfigs[key].key === key &&
      sortConfigs[key].direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfigs({
      ...sortConfigs,
      [key]: { key, direction },
    });
  };

  const sortTickets = (ticketsToSort, key, direction) => {
    return [...ticketsToSort].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  return (
    <>
      {loading && (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      )}
      {!loading && (
        <div className={styles.container}>
          <h2>Başvuru Listesi</h2>
          <ul className={styles.responsiveTable}>
            <li className={styles.tableHeader}>
              <div
                className={`${styles.col} ${styles.col1}`}
                onClick={() => requestSort("_id")}
              >
                Başvuru No
                {sortConfigs["_id"].direction === "ascending" ? "↑" : "↓"}
              </div>
              <div
                className={`${styles.col} ${styles.col2}`}
                onClick={() => requestSort("name")}
              >
                Başvuru Yapan
                {sortConfigs["name"].direction === "ascending" ? "↑" : "↓"}
              </div>
              <div
                className={`${styles.col} ${styles.col3}`}
                onClick={() => requestSort("createdAt")}
              >
                Oluşturulma Tarihi
                {sortConfigs["createdAt"].direction === "ascending" ? "↑" : "↓"}
              </div>
              <div
                className={`${styles.col} ${styles.col4}`}
                onClick={() => requestSort("status")}
              >
                Durumu
                {sortConfigs["status"].direction === "ascending" ? "↑" : "↓"}
              </div>
              <div
                className={`${styles.col} ${styles.col5}`}
                onClick={() => requestSort("response")}
              >
                Cevap
                {sortConfigs["response"].direction === "ascending" ? "↑" : "↓"}
              </div>
              <div className={`${styles.col} ${styles.col6}`}>Düzenle</div>
            </li>
            {Object.values(sortConfigs)
              .reduce((sortedTickets, config) => {
                return sortTickets(sortedTickets, config.key, config.direction);
              }, tickets)
              .map((ticket) => (
                <li className={styles.tableRow} key={ticket._id}>
                  <div
                    className={`${styles.col} ${styles.col1}`}
                    data-label="Başvuru No"
                  >
                    {ticket._id}
                  </div>
                  <div
                    className={`${styles.col} ${styles.col2}`}
                    data-label="Başvuru Yapan"
                  >
                    {ticket.name}
                  </div>
                  <div
                    className={`${styles.col} ${styles.col3}`}
                    data-label="Başvuru Yapan"
                  >
                    {new Date(ticket.createdAt).toLocaleDateString(
                      "tr-TR",
                      options
                    )}
                  </div>
                  <div
                    className={`${styles.col} ${styles.col4}`}
                    data-label="Başvuru Durumu"
                  >
                    {ticket.status}
                  </div>
                  {ticket.response ? (
                    <div
                      className={`${styles.col} ${styles.col5}`}
                      data-label="Başvuru Yanıtları"
                    >
                      {ticket.response}
                    </div>
                  ) : (
                    <div
                      className={`${styles.col} ${styles.col5}`}
                      data-label="Başvuru Yanıtları"
                    >
                      Cevap Yok
                    </div>
                  )}
                  <div
                    className={`${styles.col} ${styles.col6}`}
                    data-label="Başvuru Düzenle"
                  >
                    <Link to={`/admin/basvuru/${ticket._id}`}>
                      <span className={styles.submitBtn}>Düzenle</span>
                    </Link>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default BasvuruListesi;
