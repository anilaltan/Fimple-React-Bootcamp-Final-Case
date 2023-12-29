// import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
// import "./App.css";

import { UserProvider } from "./context/userContext";

import App from "./App.jsx";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);
