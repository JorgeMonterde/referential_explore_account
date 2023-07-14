import React from "react";
import { Link } from "react-router-dom";



const Card = (props) => {
  const {info} = props;


  return (
    <article className="card" >
      <Link className="title" to={`/details/${info.id}`}>{info.title}</Link>
      <img src={info.img} alt={info.title}/>
      <p className="author">{info.author}</p>
      <p className="medium-display">{info.medium_display}</p>
      <p className="year">{info.year}</p>
    </article>
  );
};

export default Card;
