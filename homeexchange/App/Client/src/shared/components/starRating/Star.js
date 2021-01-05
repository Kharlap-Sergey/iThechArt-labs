import React from "react";

function Star({ modificator, hover, id, hovered }) {
  return (
    <div
      className={`star-item star-item--${modificator} star-item--${hovered}`}
      onMouseOver={(e) => {
        hover(id, e);
      }}
      onMouseOut={(e) => {
        hover(id, e);
      }}
    >
      &#x2605;
    </div>
  );
}

export default Star;
