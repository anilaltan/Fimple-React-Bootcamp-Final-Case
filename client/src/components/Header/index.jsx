import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";

const Header = ({ isAuth }) => {
  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.logo}>
        <span>Başvuru Yönetim Sistemi</span>
      </h1>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/basvuru-olustur"
              className={({ isActive }) => (isActive ? `${styles.active}` : "")}
            >
              Yeni Başvuru Oluştur
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/basvuru-sorgula"
              className={({ isActive }) => (isActive ? `${styles.active}` : "")}
            >
              Başvuru Sorgula
            </NavLink>
          </li>

          {!isAuth && (
            <li>
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  isActive ? `${styles.active}` : ""
                }
              >
                Admin Girişi
              </NavLink>
            </li>
          )}

          {isAuth && (
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? `${styles.active}` : ""
                }
              >
                Admin Sayfası
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
