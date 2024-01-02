// import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useUser } from "./context/userContext";

import NoMatch from "./components/NoMatch";

import ProtectedRoute from "./components/ProtectedRoute";
import BasvuruOlustur from "./components/BasvuruOlustur";
import BasvuruBasarili from "./components/BasvuruBasarili";
import BasvuruSorgula from "./components/BasvuruSorgula";
import Basvuru from "./components/Basvuru";
import AdminLogin from "./components/AdminLogin";
import Header from "./components/Header";
import AdminPage from "./components/AdminPage";

const AppLayout = () => {
  const { token, logoutUser } = useUser();

  return (
    <>
      <Header isAuth={token} logoutUser={logoutUser} />

      <Routes>
        <Route path="/" element={<Navigate to="/basvuru-olustur" replace />} />
        <Route path="/basvuru-olustur" element={<BasvuruOlustur />} />
        <Route path="/basvuru-basarili" element={<BasvuruBasarili />} />
        <Route path="/basvuru-sorgula" element={<BasvuruSorgula />} />
        <Route path="/basvuru/:basvuruNo" element={<Basvuru />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute isAuth={token}>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
