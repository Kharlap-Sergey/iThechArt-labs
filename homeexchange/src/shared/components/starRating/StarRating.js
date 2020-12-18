import React, { useState } from "react";
import Star from "./components/Star";
import "./star-reting.scss";

const reducer = (accumulator, currentValue) => accumulator + currentValue.mark;
const STARS_COUNT = 5;

function calculateRating(rating){
  console.log('rating', rating)
  if(rating.length < 1) return 0;
  const sum = rating.reduce(reducer, 0);
  console.log('sum', sum)
  return  sum / rating.length;
}

function StarRating({ currentRating, handleClick}) {
  const [onHoveredId, setHoveredId] = useState(0);

  const hover = (id, e) => {
    console.log("hover");
    if (e.type == "mouseover") {
      setHoveredId(id);
    }
    if (e.type == "mouseout") {
      setHoveredId(0);
    }
    console.log('onHoveredId', onHoveredId)
  };

  const getStars = (count, currentRating) => {
    const res = [];
    console.log('currentRating', currentRating)
    for (let i = 0; i < count; i++) {
      const tp =
        currentRating <= 0 ? "empty" : currentRating >= 1 ? "full" : "half";
      currentRating--;
      res.push(
        <Star
          modificator={tp}
          hover={hover}
          id={i + 1}
          hovered={i + 1 <= onHoveredId ? "hover" : null}
        />
      );
    }

    return res;
  };
  return (
    <div className="star-rating">
      {getStars(STARS_COUNT, calculateRating(currentRating)).map((star, index) => (
        <li key={index} className="star-rating__item" onClick={(e) => {
          console.log('index', index);
          handleClick(index+1, e)}}>
          {star}
        </li>
      ))}
    </div>
  );
}

export default StarRating;