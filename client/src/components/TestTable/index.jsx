import styles from "./styles.module.css"; // Your CSS file path

const TestComp = () => {
  return (
    <div className={styles.container}>
      <h2>Başvuru Listesi</h2>
      <ul className={styles.responsiveTable}>
        <li className={styles.tableHeader}>
          <div className={styles.col + " " + styles.col1}>Job Id</div>
          <div className={styles.col + " " + styles.col2}>Customer Name</div>
          <div className={styles.col + " " + styles.col3}>Amount Due</div>
          <div className={styles.col + " " + styles.col4}>Payment Status</div>
        </li>
        <li className={styles.tableRow}>
          <div className={styles.col + " " + styles.col1} data-label="Job Id">
            42235
          </div>
          <div
            className={styles.col + " " + styles.col2}
            data-label="Customer Name"
          >
            John Doe
          </div>
          <div className={styles.col + " " + styles.col3} data-label="Amount">
            $350
          </div>
          <div
            className={styles.col + " " + styles.col4}
            data-label="Payment Status"
          >
            Pending
          </div>
        </li>
        <li className={styles.tableRow}>
          <div className={styles.col + " " + styles.col1} data-label="Job Id">
            42442
          </div>
          <div
            className={styles.col + " " + styles.col2}
            data-label="Customer Name"
          >
            Jennifer Smith
          </div>
          <div className={styles.col + " " + styles.col3} data-label="Amount">
            $220
          </div>
          <div
            className={styles.col + " " + styles.col4}
            data-label="Payment Status"
          >
            Pending
          </div>
        </li>
        <li className={styles.tableRow}>
          <div className={styles.col + " " + styles.col1} data-label="Job Id">
            42257
          </div>
          <div
            className={styles.col + " " + styles.col2}
            data-label="Customer Name"
          >
            John Smith
          </div>
          <div className={styles.col + " " + styles.col3} data-label="Amount">
            $341
          </div>
          <div
            className={styles.col + " " + styles.col4}
            data-label="Payment Status"
          >
            Pending
          </div>
        </li>
        <li className={styles.tableRow}>
          <div className={styles.col + " " + styles.col1} data-label="Job Id">
            42311
          </div>
          <div
            className={styles.col + " " + styles.col2}
            data-label="Customer Name"
          >
            John Carpenter
          </div>
          <div className={styles.col + " " + styles.col3} data-label="Amount">
            $115
          </div>
          <div
            className={styles.col + " " + styles.col4}
            data-label="Payment Status"
          >
            Pending
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TestComp;
