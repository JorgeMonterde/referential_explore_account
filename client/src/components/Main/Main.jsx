import React from "react";
import { Routes, Route } from 'react-router-dom';

//import components
import Home from "./Home/Home";
import Explore from "./Explore/Explore";
import Details from "./Details/Details";
import Account from "./Account/Account";


const Main = () => {

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/account/:subsection" element={<Account />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </main>
  );
};

export default Main;
