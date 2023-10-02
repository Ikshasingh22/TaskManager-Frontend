import React from "react";
import Cookies from "js-cookie";
import "../App.css";
import { useNavigate } from 'react-router-dom';
const LogOut = ({ setUserState }) => {
  // method  handle logout
  const navigate = useNavigate();
  const handleLogout = () => {
    // remove the token from cookies
    Cookies.remove("token");

    // Set the user state to false
    setUserState(false);
    navigate('/');
   
  };

  return (
    <button className="button" onClick={handleLogout}>Log Out</button>
  );
};

export default LogOut;
