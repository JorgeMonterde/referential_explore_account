import React, {useState, useEffect} from "react";
import axios from "axios";

  /* {
    "artwork_info": {
        "title": title,
        "author": author,
        "description": description,
        "year": year,
        "media": media,
        "dimensions": dimensions,
        "medium_display": mediumDisplay,
        "front_image": frontImage,
        "other_images": otherImages,
        "coord": coord
    },
    "is_public": isPublic,
    "creator_id": creatorId
} */



const ExploreForm = (props) => {
  const {setArtworksInfo} = props;
  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newSearch = event.target.search.value;
    // update "weatherForm" state with search
    setSearch(newSearch);
  };

  useEffect(() => {
      const getArtworksInfo = async(search) => {
        // get artwork info from api
        const response = await axios.get(`api/artworks/search/${search}`);
        
        if(response.data.success){
          setArtworksInfo(response.data.data);
          console.log(response.data.message)
        } else {
          console.log("Something went wrong...")
        }
        
      };
      console.log("---->",search)
      getArtworksInfo(search);
  }, [search])





  return (
  <form className="explore-form" onSubmit={handleSubmit}>
    <input type="text" name="search" id="search" placeholder="search"/>
    <input type="submit" value="Send search" />
  </form>
  );
};

export default ExploreForm;
