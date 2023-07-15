import React from "react";
import { Link } from "react-router-dom";




const Details = (props) => {
  const {details} = props;



  return (
  <section className="details">
    <h2>Artwork details</h2>
    <div className="details-controls">
      <button>Add to project</button>
      <button>Close</button>
    </div>

    <article className="details-display">
      <article className="required-card" >
        <h3>{details.info.title}</h3>
        <img src={details.img} alt={details.info.title}/>
        <p className="author">{details.info.author}</p>
        <p className="medium-display">{details.info.medium_display}</p>
        <p className="year">{details.info.date_display}</p>
      </article>
      <article>
        
      </article>

    </article>
  </section>
  );
};

export default Details;
