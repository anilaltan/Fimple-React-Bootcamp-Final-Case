import { NavLink } from "react-router-dom";
import { useUser } from "../../context/userContext";
import styles from "./styles.module.css";

const AdminSidebar = () => {
  const { logoutUser } = useUser();
  return (
    <div className={styles.sideBar}>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/admin/basvuru-listesi"
              className={({ isActive }) => (isActive ? `${styles.active}` : "")}
            >
              basvuru-listesi
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/ad"
              end
              className={({ isActive }) => (isActive ? `${styles.active}` : "")}
            >
              Yeni Admin Hesabı Oluştur
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.logoutBtnContainer}>
        <span
          onClick={logoutUser}
          style={{ cursor: "pointer" }}
          className={styles.logoutBtn}
        >
          Çıkış
        </span>
      </div>
    </div>
  );
};

export default AdminSidebar;
