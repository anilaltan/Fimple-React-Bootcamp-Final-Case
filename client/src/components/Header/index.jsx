import { NavLink } from "react-router-dom";
import { useState } from "react";
import Hamburger from "./HamburgerMenu";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "./styles.module.css";

const Header = ({ isAuth, logoutUser }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <header className={styles.headerContainer}>
        <h1 className={styles.logo}>
          <span>Başvuru Yönetim Sistemi</span>
        </h1>

        <div
          className={styles.hamburger}
          onClick={toggleMenu}
          // style={{ display: "none" }}
        >
          <GiHamburgerMenu />
          <Hamburger
            isOpen={isMenuOpen}
            isAuth={isAuth}
            logoutUser={logoutUser}
          />
        </div>

        <nav className={styles.nav}>
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
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
