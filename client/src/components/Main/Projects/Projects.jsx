import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Projects = (props) => {
  const {authState} = props;
  const navigate = useNavigate();
      
  

  useEffect(() => {

    const getProjects = async() => {

      // get projects from db
      const response = await axios.get("/api/users/project");
      
      console.log("response:", response.data);
      if(response.data.auth){
        console.log("hello");
        
      } else {
        navigate("/login");
      }
    };
    getProjects();
}, [])

  





  const printProjects = () => {

  };


  return (
    <section className="account projects">
      <article className="part-a">
        <div className="titles-and-aux">
          <div className="titles">
            <p>Profile</p>
            <p>Projects</p>

          </div>
          <div className="aux">
            <p>aux</p>
            <img src="https://www.artic.edu/iiif/2/744cb88d-8420-eedc-b335-db3d0bbe6919/full/843,/0/default.jpg" alt=""/>
          </div>
        </div>
        <div className="info">
          {/* {printProfile()} */}
          {printProjects()}
          <p>Some info here</p>
          <p>Some info here</p>
          <p>Some info here</p>
          <p>Some info here</p>
          <p>Some info here</p>
          <p>Some info here</p>
          <p>Some info here</p>
          <p>Some info here</p>
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
