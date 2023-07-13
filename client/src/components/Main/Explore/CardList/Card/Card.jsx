import React from "react";
import { Link } from "react-router-dom";



const Card = (props) => {
  const {info} = props;

  return (
    <article className="card" >
      <Link className="title" to={`/details/${info.id}`}>{info.title}</Link>
      <img src={info.img} alt={info.title}/>
      <p>{info.author}</p>
      <p>{info.year}</p>
      <p>{info.medium_display}</p>
    </article>
  );
};

export default Card;
