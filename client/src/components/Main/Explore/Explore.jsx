import React, {useRef, useState} from "react";

//components
import ExploreForm from "./ExploreForm/ExploreForm";
import CardList from "./CardList/CardList";
import Pagination from "./Pagination/Pagination";


const Explore = () => {
  const [artworksInfo, setArtworksInfo] = useState([]);
  const [search, setSearch] = useState("");
  const totalItems = useRef(0);
  
  const addArtworksInfo = (info) => {
    setArtworksInfo(info);
  };

  const addTotalItems = (num) => {
    totalItems.current = num;
  };


  return (
  <section className="explore-section">
    <ExploreForm addArtworksInfo={addArtworksInfo} searchProps={{search, setSearch}} addTotalItems={addTotalItems}/>
    <CardList artworksInfo={artworksInfo} />
    <Pagination artworksInfo={artworksInfo} addArtworksInfo={addArtworksInfo} search={search} totalItems={totalItems}/>
  </section>
  );
};

export default Explore;
