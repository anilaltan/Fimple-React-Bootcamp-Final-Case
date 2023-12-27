import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { TicketsProvider } from "./context/ticketContext";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import BasvuruOlustur from "./components/BasvuruOlustur";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/basvuru-olustur" />,
  },
  {
    path: "/admin",
    element: (
      <TicketsProvider>
        <App />
      </TicketsProvider>
    ),
  },
  {
    path: "/basvuru-olustur",
    element: <BasvuruOlustur />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
