import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
//context
import { DetailsContext } from "../../../../../../context/detailsContext";



const Card = (props) => {
  const {info, rawInfo} = props;
  const {detailsState} = useContext(DetailsContext);
  const navigate = useNavigate();
  
  const handleClick = () => {
    /* console.log("details", rawInfo);
    console.log("context", detailsState); */
    detailsState.setDetails({rawInfo});
    //navigate("/details");
    
  };


  return (
    <article className="card" >
      <Link className="title" to={`/details/${info.id}`}>{info.title}</Link>
      <img src={info.img} alt={info.title}/>
      <p className="author">{info.author}</p>
      <p className="medium-display">{info.medium_display}</p>
      <p className="year">{info.year}</p>
      <div className="card-controls">
        <button className="details" onClick={handleClick}>+Info</button>
      </div>
      
    </article>
  );
};

export default Card;
