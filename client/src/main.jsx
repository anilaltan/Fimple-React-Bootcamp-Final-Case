import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { TicketsProvider } from "./context/ticketContext";
import { UserProvider } from "./context/userContext";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import BasvuruOlustur from "./components/BasvuruOlustur";
// import TicketsList from "./components/TicketsList";
import TicketsList from "./components/TicketsList/index.jsx";
import AdminProfile from "./components/AdminProfile/index.jsx";
import Header from "./components/Header/index.jsx";
import BasvuruBasarili from "./components/BasvuruBasarili/index.jsx";
import Basvuru from "./components/Basvuru/index.jsx";
import BasvuruSorgula from "./components/BasvuruSorgula/index.jsx";
import AdminLogin from "./components/AdminLogin/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/basvuru-olustur" />,
  },
  {
    path: "/basvuru-olustur",
    element: (
      <>
        <Header />
        <BasvuruOlustur />
      </>
    ),
  },
  {
    path: "/basvuru-basarili",
    element: <BasvuruBasarili />,
  },
  {
    path: "/basvuru-sorgula",
    element: <BasvuruSorgula />,
  },
  {
    path: "/basvuru/:ticketNo",
    element: <Basvuru />,
  },
  {
    path: "/admin",
    element: (
      <>
        <Header />
        <AdminLogin />
      </>
    ),
  },
  {
    path: "/adminProfile",
    element: (
      <>
        <Header />
        <UserProvider>
          <AdminProfile />
        </UserProvider>
      </>
    ),
  },
  {
    path: "/admin/basvuru-listesi",
    element: (
      <>
        <Header />
        <TicketsProvider>
          <TicketsList />
        </TicketsProvider>
      </>
    ),
  },
  {
    path: "/admin/basvuru/:basvuruNo",
    element: (
      <TicketsProvider>
        <TicketsList />
      </TicketsProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
