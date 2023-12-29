import { NavLink } from "react-router-dom";
import { useUser } from "../../context/userContext";
import styles from "./styles.module.css";

const AdminSidebar = () => {
  const { logoutUser } = useUser();
  return (
    <div className={styles.sideBar}>
      <h2>Admin Sidebar</h2>
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
              to="/admin"
              end
              className={({ isActive }) => (isActive ? `${styles.active}` : "")}
            >
              admin
            </NavLink>
          </li>

          <li>
            <span
              onClick={logoutUser}
              style={{ cursor: "pointer" }}
              className={styles.logoutBtn}
            >
              Logout
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
