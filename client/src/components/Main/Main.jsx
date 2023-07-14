import React from "react";
import { Routes, Route } from 'react-router-dom';

//import components
import Home from "./Home/Home";
import Explore from "./Explore/Explore";
import Details from "./Details/Details";
import Projects from "./Projects/Projects";
import Profile from "./Profile/Profile";


const Main = () => {

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/account/projects" element={<Projects />} />
        <Route path="/account/profile" element={<Profile />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </main>
  );
};

export default Main;
