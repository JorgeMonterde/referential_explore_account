import React, {useState, useEffect} from "react";
import { Routes, Route } from 'react-router-dom';
import axios from "axios";

//import components
import Home from "./Home/Home";
import Explore from "./Explore/Explore";
import Details from "./Details/Details";
import Projects from "./Projects/Projects";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";

//Contexts
import { UserProjectsContext } from "../../../context/userProjectsContext";
import { DetailsContext } from "../../../context/detailsContext";




const Main = () => {
  //auth state
  const [auth, setAuth] = useState(false);
  const authState = {auth, setAuth};
  //user projects state
  const [userProjects, setUserProjects] = useState([]);
  const userProjectsState = {userProjects, setUserProjects};
  //details state
  const [details, setDetails] = useState({});
  const detailsState = {details, setDetails};


  //get user's projects if logged in;
  useEffect(() => {
    const getUserProjects = async() => {
      try {
        const response = await axios.get("api/users/project");
        console.log("users projects response: ",response);
        setUserProjects(response.data.data);

      } catch (error) {
        console.log("user not logged in");
      }
    }
    getUserProjects();
  }, []);




  return (
    <main>
        <UserProjectsContext.Provider value={{userProjectsState}} >
        <DetailsContext.Provider value={{detailsState}} >
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/account/projects" element={<Projects authState={authState}/>} />
            <Route path="/account/profile" element={<Profile authState={authState}/>} />
            <Route path="/details/:id" element={<Details />} />
          <Route path="/login" element={<Login authState={authState}/>} />
        </Routes>
      </DetailsContext.Provider>
      </UserProjectsContext.Provider>
    </main>
  );
};

export default Main;
