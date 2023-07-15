import React, {useState} from "react";

//util functions
import { v4 as uuidv4 } from "uuid";

//import components
import Card from "./Card/Card";



const CardList = (props) => {
  const {artworksInfo} = props;


  const formatInfo = (artworksInfo) => {
    console.log(artworksInfo)
    const {img, info} = artworksInfo; 
    return {
      "title": info.title,
      img,
      "author": info.artist_title,
      "year": info.date_end,
      "medium_display": info.medium_display
    }
  };


  const printCards = () => artworksInfo.map(artworkInfo => {
    let key1 = uuidv4();
    let key2 = uuidv4();
    const info = formatInfo(artworkInfo);
    return (<li key={key2}><Card key={key1} info={info} rawInfo={artworkInfo}/></li>)
    }
  );

  return (
    <section className="card-list">
      {artworksInfo[0] ? printCards() : ""}

    </section>
  );
};

export default CardList;




