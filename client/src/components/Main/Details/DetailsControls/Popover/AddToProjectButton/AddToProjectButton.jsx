import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import './AddToProjectButton.css';
import axios from "axios";
//contexts
import { DetailsContext } from "../../../../../../../context/detailsContext";
import { UserProjectsContext } from "../../../../../../../context/userProjectsContext";



  
const AddToProjectButton = (props) => {
    const {projectSelector} = props;
    const [buttonText, setButtonText] = React.useState("Add to project");
    const [newArtworkDetails, setNewArtworkDetails] = React.useState({});
    const {detailsState} = React.useContext(DetailsContext);
    const details = detailsState.details;
    const {userProjectsState} = React.useContext(UserProjectsContext);
    /*  project
    setProject */
    
    const [open, setOpen] = React.useState(false);
    const eventDateRef = React.useRef(new Date());
    const timerRef = React.useRef(0);
    
    React.useEffect(() => {
      return () => clearTimeout(timerRef.current);
    }, []);
    
    
    //add artwork to a project:
    const addArtworkToProject = async() => {
      //format info
      const data = details.rawInfo;
      const detailsToSend = {
        "artworkInfo": {
          "title": data.info.title,
          "author": data.info.artist_title,
          "description": "",
          "year": data.info.date_display
          ,
          "media": data.info.medium_display,
          "dimensions": data.info.dimensions,
          "mediumDisplay": data.info.medium_display,
          "frontImage": data.img,
            "otherImages": [],
            "coord": {
              "lat": data.info.latitude,
              "lon": data.info.longitude
            }
          },
          "isPublic": false,
          "creatorId": ""
        }
        
      const projectToStore = userProjectsState.userProjects.filter(item => item.title == projectSelector.project);
      console.log("MY PROJECT!!", projectToStore);

      try {
          //send and store info
      console.log("new artwork to project: ", detailsToSend)
      const response = await axios.post("http://localhost:3000/api/artworks/artwork", detailsToSend, {withCredentials:true});
      console.log("response: ", response);
      
      let projectId = projectToStore[0].project_id;
      let artworkMongoId = response.data.data._id;
      console.log("mongo id ????: ", projectId, response, artworkMongoId);
      let artworksTableIds = {projectId, artworkMongoId};
      const secondResponse = await axios.post("http://localhost:3000/api/users/artworks", artworksTableIds, {withCredentials:true});
      
      
      //navigate("/account/projects");
    } catch (error) {
      console.log("Something went wrong");  
    }
    
  }






  return (
    <Toast.Provider swipeDirection="right">
      <button
        className="Button large violet"
        onClick={() => {
          setButtonText("Artwork added");
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {

            eventDateRef.current = addArtworkToProject();
            setButtonText("Add to project");
           
          }, 3000);
        }}
      >
        {buttonText}
      </button>

      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <Toast.Description asChild>
        </Toast.Description>
      </Toast.Root>
    </Toast.Provider>
  );
};


export default AddToProjectButton;


