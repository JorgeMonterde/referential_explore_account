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
  const {addArtworksInfo, searchProps, addTotalItems} = props;
  const {search, setSearch} = searchProps;


  const handleSubmit = (event) => {
    event.preventDefault();
    const newSearch = event.target.search.value;

    setSearch(newSearch);
  };

  useEffect(() => {
      const getArtworksInfo = async(search) => {
        const limit = 20;

        // get artwork info from api
        const response = await axios.get(`api/artworks/search?search=${search}&page=0&limit=${limit}`);
        if(response.data.success){
          addArtworksInfo(response.data.data);
          addTotalItems(response.data.total);
          console.log(response.data.message, response.data.total)
        } else {
          console.log("Something went wrong...")
        }
      };

      if(search){
        console.log("---->",search)
        getArtworksInfo(search);
      }
      
  }, [search])

  



  return (
  <form className="explore-form" onSubmit={handleSubmit}>
    <input type="text" name="search" id="search" placeholder="search"/>
    <input type="submit" id="submit" value="Send search" />
  </form>
  );
};

export default ExploreForm;
