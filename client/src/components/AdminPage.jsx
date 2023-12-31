import AdminSidebar from "./AdminSideBar/AdminSidebar";
import { Route, Routes } from "react-router-dom";
import BasvuruListesi from "./BasvuruListesi";
import EditBasvuru from "./EditBasvuru";
import { TicketsProvider } from "../context/ticketContext";

const AdminPage = () => {
  return (
    <div>
      <div>
        <AdminSidebar />
        <Routes>
          <Route
            path="/basvuru-listesi"
            element={
              <TicketsProvider>
                <BasvuruListesi />
              </TicketsProvider>
            }
          />
          <Route
            path="/basvuru/:basvuruNo"
            element={
              <TicketsProvider>
                <EditBasvuru />
              </TicketsProvider>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
