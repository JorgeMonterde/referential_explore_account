import React, {useState} from "react";
import { Link } from "react-router-dom";


const NavBar = () => {
  const {page, setPage} = useState("");

  const handleClickHome = () => {
    setPage("home");
  };
  const handleClickExplore = () => {
    setPage("explore");
  };
  const handleClickAccount = () => {
    setPage("account");
  };



  return (
  <nav className="nav-bar">
    <ul className="link-list">
      <li><Link className={`link nav-link ${page == "home"? "visiting" : ""}`} to="/" onClick={handleClickHome}>Referential</Link></li>
      <li><Link className={`link nav-link ${page == "explore"? "visiting" : ""}`} to="/explore" onClick={handleClickExplore}>/Explore</Link></li>
      <li><Link className={`link nav-link ${page == "account"? "visiting" : ""}`} to="/account/profile" onClick={handleClickAccount}>/Account</Link></li>
    </ul>
  </nav>
  );
};

export default NavBar;
