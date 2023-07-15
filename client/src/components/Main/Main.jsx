import React, {useState} from "react";
import { Routes, Route } from 'react-router-dom';

//import components
import Home from "./Home/Home";
import Explore from "./Explore/Explore";
import Details from "./Details/Details";
import Projects from "./Projects/Projects";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";


const Main = () => {
  //auth state
  const [auth, setAuth] = useState(false);
  const authState = {auth, setAuth};



  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/account/projects" element={<Projects authState={authState}/>} />
          <Route path="/account/profile" element={<Profile authState={authState}/>} />
          <Route path="/details/:id" element={<Details />} />
        <Route path="/login" element={<Login authState={authState}/>} />
      </Routes>
    </main>
  );
};

export default Main;
