import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Footer = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
      const response = await axios.get("http://localhost:3000/auth/logout", { withCredentials: true });
      
      navigate("http://localhost:5173/login");
  };




  return (
  <footer className="footer">
    <button className="logout-button" onClick={handleClick}>Log out</button>
    
  </footer>
  );
};

export default Footer;
