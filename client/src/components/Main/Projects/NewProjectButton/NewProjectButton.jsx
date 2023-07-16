import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
//import './styles.css';
import axios from "axios";







const NewProject = () => {
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



  
  const addNewProjectButton = () => {

  };




  
  return (

    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">New project</button>
      </Dialog.Trigger>
      <Dialog.Portal >
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Add new project</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Give a title and a description about your new project:
          </Dialog.Description>
          
          {/* <fieldset className="Fieldset">
            <label className="Label" htmlFor="title">
              Title
            </label>
            <input className="Input" id="title" />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="">
              Description
            </label>
            <input className="Input" id="specification"/>
          </fieldset>

          <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
            <Dialog.Close asChild>
              <button type="submit" className="Button green" onClick={addNewProjectButton}>Add new project</button>
            </Dialog.Close>
          </div> */}

          {/* <form className="new-project-form" onSubmit={handleSubmitNewProject(onSubmitNewProject)}>
              <h2>Add new project</h2>
              <input type="text" placeholder="Title" {...registerNewProject("title", {required: true, maxLength: 100})} />
              <input type="text" placeholder="Description" {...registerNewProject("specification", {required: true, maxLength: 200})} />

            <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
              
                <button type="submit" className="Button green">Add new project</button>
              
            </div>
          </form> */}


          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>

  
)};

export default NewProject;