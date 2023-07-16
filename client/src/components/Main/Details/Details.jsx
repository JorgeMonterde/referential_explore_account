import React from "react";
import { Link } from "react-router-dom";

//components
import DetailsControls from "./DetailsControls/DetailsControls";




const Details = (props) => {
  const {details} = props;



  return (
  <section className="details">
    <h2>Artwork details</h2>
    <DetailsControls/>

    <article className="details-display">
      <article className="required-card" >
        <h3>{details.info.title}</h3>
        <img src={details.img} alt={details.info.title}/>
        <p className="author">{details.info.author}</p>
        <p className="medium-display">{details.info.medium_display}</p>
        <p className="year">{details.info.date_display}</p>
      </article>

      <article className="extra-card aditional-info" >
        <h4>Aditional info</h4>
        <div className="written-content">
          <p className="dimensions">Style: {details.info.style_title}</p>
          <p className="dimensions">Dimensions: {details.info.dimensions}</p>
          <p className="origin">Origin: {details.info.place_of_origin}</p>
          
        </div>
      </article>

      {details.info.publication_history?
        <article className="extra-card publication-history" >
          <h4>Publication history</h4>
          <div className="written-content">
            <p className="publication-history">{details.info.publication_history}</p>
          </div>  
        </article>
        : ""}

      {details.info.exhibition_history ?
        <article className="extra-card exhibition-history" >
          <h4>Exhibition history</h4>
          <div className="written-content"><p className="exhibition-history">{details.info.exhibition_history}</p></div>
        </article> 
        : ""}
      

    </article>
  </section>
  );
};

export default Details;
