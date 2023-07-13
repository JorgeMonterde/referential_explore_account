import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
  <nav className="nav-bar">
    <ul className="link-list">
      <li><Link className="link nav-link" to="/">Referential</Link></li>
      <li><Link className="link nav-link" to="/explore">/Explore</Link></li>
      <li><Link className="link nav-link" to="/account/profile">/Account</Link></li>
    </ul>
  </nav>
  );
};

export default NavBar;
