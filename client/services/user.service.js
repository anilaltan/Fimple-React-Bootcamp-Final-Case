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

const getUserBoard = () => {
  return axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
    headers: authHeader(),
  });
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

const UserService = {
  getPublicContent,
  getUserBoard,
  postNewTicket,
  getTicketByTicketNo,
};

export default UserService;
