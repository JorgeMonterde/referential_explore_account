import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

//import './NewProjectButton.css';
import axios from "axios";



const NewProjectButton = () => {
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const navigate = useNavigate();
  const {
      register: registerNewProject,
      formState: { errors: errorsNewProject },
      handleSubmit: handleSubmitNewProject,
  } = useForm();

  console.log("errors here: ", errorsNewProject);


  const onSubmitNewProject = async(data) => {
    try {
      console.log("new project: ", data)
      const response = await axios.post("http://localhost:3000/api/users/project", data, {withCredentials:true});
      console.log("response: ", response)
      
      navigate("/account/projects");
    } catch (error) {
      console.log("Something went wrong");  
    }
  };



  
  const newProjectForm = () => {
    setShowNewProjectForm(!showNewProjectForm);
  };




  
  return (
    <article className="new-project-function">
      <button className="grid-button add-new-project" onClick={newProjectForm}>New project</button>
      {showNewProjectForm ?
        <form className="new-project-form" onSubmit={handleSubmitNewProject(onSubmitNewProject)}>
          <h2>Add new project</h2>
          <input type="text" placeholder="Title" {...registerNewProject("title", {required: true, maxLength: 100})} />
          <input type="text" placeholder="Description" {...registerNewProject("specification", {required: true, maxLength: 200})} />
          <button type="submit">Add new project</button>
        </form>
        : ""}
    </article>

)};

export default NewProjectButton;