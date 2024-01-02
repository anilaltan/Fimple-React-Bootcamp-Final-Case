import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";
export default function Hamburger({ isOpen, isAuth, logoutUser }) {
  return (
    <>
      {isOpen && (
        <nav className={styles.hamburgerNav}>
          <ul>
            <li>
              <NavLink
                to="/basvuru-olustur"
                className={({ isActive }) =>
                  isActive ? `${styles.active}` : ""
                }
              >
                Yeni Başvuru Oluştur
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/basvuru-sorgula"
                className={({ isActive }) =>
                  isActive ? `${styles.active}` : ""
                }
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
            {isAuth && (
              <li>
                <span
                  onClick={logoutUser}
                  style={{ cursor: "pointer" }}
                  className={styles.logoutBtn}
                >
                  Çıkış
                </span>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  );
}
