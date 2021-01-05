import React, { useState } from "react";
import PropTypes from 'prop-types'
import Star from "./Star";
import "./star-reting.scss";

const STARS_COUNT = 5;

function StarRating({ currentRating, handleClick }) {
  const [onHoveredId, setHoveredId] = useState(0);

  const hover = (id, e) => {
    if (e.type === "mouseover") {
      setHoveredId(id);
    }
    if (e.type === "mouseout") {
      setHoveredId(0);
    }
  };

  const getStars = (count, currentRating) => {
    const res = [];
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
      {getStars(STARS_COUNT, currentRating).map((star, index) => (
        <li
          key={index}
          className="star-rating__item"
          onClick={(e) => {
            handleClick(index + 1, e);
          }}
        >
          {star}
        </li>
      ))}
    </div>
  );
}

StarRating.propTypes = {
  currentRating: PropTypes.number,
  handleClick: PropTypes.func,
}
export default StarRating;
