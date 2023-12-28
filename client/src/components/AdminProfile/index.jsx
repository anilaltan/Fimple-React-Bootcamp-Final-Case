// import { useEffect, useState } from "react";
// import UserService from "../../../services/user.service";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service";

const AdminProfile = () => {
  const navigate = useNavigate();
  const { user, loading } = useUser();

  const logOut = () => {
    AuthService.logout();
    navigate("/admin");
  };
  const logOutAll = () => {
    AuthService.logoutAll();
    navigate("/admin");
  };

  return (
    <>
      <div>
        <h2>User Profile</h2>
        {loading && <div>Loading...</div>}
        {user && (
          <div>
            <p>Username: {user.username}</p>
            <p>Email: {user._id}</p>
            <button onClick={logOut}>log out</button>
            <button onClick={logOutAll}>log out all devices</button>
          </div>
        )}
        {!loading && !user && <div>No user logged in</div>}
      </div>
    </>
  );
};

export default AdminProfile;
