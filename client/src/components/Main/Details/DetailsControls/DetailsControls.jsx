import React from "react";
import Popover from "./Popover/Popover";



const DetailsControls = () => {
  const addToProject = () => {

  };
  const closeDetails = () => {

  };


  return (
    <div className="details-controls">
      <Popover className="add-project-popover"/>
      {/* <button onClick={addToProject}>Add to project</button>
      <button onClick={closeDetails}>Close</button> */}
    </div>
  );
};

export default DetailsControls;
