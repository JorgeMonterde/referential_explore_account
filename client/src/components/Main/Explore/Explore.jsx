import React, {useState} from "react";
import ExploreForm from "./ExploreForm/ExploreForm";
import CardList from "./CardList/CardList";


const Explore = () => {
  const [artworksInfo, setArtworksInfo] = useState([]);
  const addArtworksInfo = (info) => {
    setArtworksInfo(info);
  };

  return (
  <section className="explore-section">
    <h2>Explore</h2>
    <ExploreForm artworksInfo={artworksInfo} setArtworksInfo={addArtworksInfo} />
    <CardList artworksInfo={artworksInfo}/>
  </section>
  );
};

export default Explore;
