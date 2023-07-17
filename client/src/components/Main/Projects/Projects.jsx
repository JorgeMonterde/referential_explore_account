import React, {useEffect, useContext} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
//util functions
import { v4 as uuidv4 } from "uuid";
//contexts
import { UserProjectsContext } from "../../../../context/userProjectsContext";
//components
import NewProjectButton from "./NewProjectForm/NewProjectForm";


const Projects = (props) => {
  const {authState} = props;
  const navigate = useNavigate();
  const {userProjectsState} = useContext(UserProjectsContext);
  const userProjects = userProjectsState.userProjects;
  
  

  useEffect(() => {

    const getProjects = async() => {
      // get projects from db
      try {
        const response = await axios.get("http://localhost:3000/api/users/project", { withCredentials: true });
        console.log("response:", response.data);
      } catch (error){
        console.log("Error: ", error);
        navigate("/login");
      }
    };
    getProjects();
  }, [])

  
  const newProjectForm = () => {

  };

  useEffect(() => {
    console.log("O-O-O-O->", userProjects);
  },[userProjects]);




  const printProjects = () => {

    return (
      <>
        <NewProjectButton></NewProjectButton>
        {userProjects.map(project => <button key={uuidv4()}>{project.title}</button>)}
      </>
    )

  };


  return (
    <section className="account projects">
      <article className="part-a">
        <div className="titles-and-aux">
          <div className="titles">
          <p><Link className="subsection" to="/account/profile" >Profile</Link></p>
          <p><Link className="subsection" to="/account/projects" >Projects</Link></p>


          </div>
          <div className="aux">
            <p>aux</p>
            <img src="https://www.artic.edu/iiif/2/744cb88d-8420-eedc-b335-db3d0bbe6919/full/843,/0/default.jpg" alt=""/>
          </div>
        </div>
        <div className="info">
          {/* {printProfile()} */}
          {userProjects? printProjects() : "hello"}
          
        </div>
      </article>
        
      <article className="part-b">
        <p>More info about the artworks</p>
        <p>More info about the artworks</p>
        <p>More info about the artworks</p>
        <p>More info about the artworks</p>
        <p>More info about the artworks</p>
        <p>More info about the artworks</p>
        <p>More info about the artworks</p>
        <p>More info about the artworks</p>
      </article>
    </section>
  );
};

export default Projects;
