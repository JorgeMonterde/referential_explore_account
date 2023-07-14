import {useRef, useState, useEffect} from "react";
import axios from "axios";


const Pagination = (props) => {
  const {artworksInfo, addArtworksInfo, search, totalItems} = props;
  const page = useRef(1);
  const limit = 20;
  const itemsShown = useRef(limit);


    //get MORE artworks info:
  const handleClick = (event) => {
    event.preventDefault();
    const getArtworksInfo = async(search) => {
      page.current++;

      // get artwork info from api; use "page" from state
      const response = await axios.get(`api/artworks/search?search=${search}&page=${page.current}&limit=${limit}`);
      if(response.data.success){
        addArtworksInfo([...artworksInfo, ...response.data.data]);
        itemsShown.current += limit;
        console.log(response.data.message)
      } else {
        console.log("Something went wrong...", response.data)
      }
    };
  
    getArtworksInfo(search);
  };


  const hidePagination = () => {
    if(!artworksInfo[0] || totalItems.current<itemsShown.current){
      return "hidden";
    } else {
      return "";
    }
  };




  return (
    <div className={`pagination ${hidePagination()}`}>
      <button onClick={handleClick}>Show more results</button>
    </div>
  );
};

export default Pagination;
