import axios from "axios";
import authHeader from "./auth-header";

const getPublicContent = () => {
  return axios.get(`${import.meta.env.VITE_API_BASE_URL}/basvuru`, {
    headers: authHeader(),
  });
};

const getTicketByTicketNo = (ticketNo) => {
  return axios.get(`${import.meta.env.VITE_API_BASE_URL}/basvuru/${ticketNo}`);
};

const postNewTicket = (data) => {
  return axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/basvuru-olustur`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const updateTicket = (ticketNo, status, response) => {
  return axios.put(`${import.meta.env.VITE_API_BASE_URL}/basvuru/${ticketNo}`, {
    status: status,
    response: response,
  });
};

const UserService = {
  getPublicContent,
  updateTicket,
  postNewTicket,
  getTicketByTicketNo,
};

export default UserService;
