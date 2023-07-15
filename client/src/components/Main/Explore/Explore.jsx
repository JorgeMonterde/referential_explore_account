import React, {useRef, useState, useContext} from "react";

//components
import ExploreForm from "./ExploreForm/ExploreForm";
import CardList from "./CardList/CardList";
import Pagination from "./Pagination/Pagination";
import Details from "../Details/Details";
//context
import { DetailsContext } from "../../../../context/detailsContext";


const Explore = () => {
  const [artworksInfo, setArtworksInfo] = useState([]);
  const [search, setSearch] = useState("");
  const totalItems = useRef(0);
  const {detailsState} = useContext(DetailsContext);
  

  const addArtworksInfo = (info) => {
    setArtworksInfo(info);
  };

  const addTotalItems = (num) => {
    totalItems.current = num;
  };

  console.log("state---->", detailsState);


  return (
  <section className="explore-section">

    {detailsState.details.rawInfo ?
    
    <Details details={detailsState.details.rawInfo}/>
    : <><ExploreForm addArtworksInfo={addArtworksInfo} searchProps={{search, setSearch}} addTotalItems={addTotalItems}/>
    <CardList artworksInfo={artworksInfo} />
    <Pagination artworksInfo={artworksInfo} addArtworksInfo={addArtworksInfo} search={search} totalItems={totalItems}/></>
    }

  </section>
  );
};

export default Explore;
