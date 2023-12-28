import { NavLink, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <div className="App">
      <nav>
        <NavLink
          to="/basvuru-olustur"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/admin"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Admin
        </NavLink>
        <NavLink
          to="/adminProfile"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Admin Profile
        </NavLink>
        <NavLink
          to="/admin/basvuru-listesi"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Admin basvuru listesi
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Header;
