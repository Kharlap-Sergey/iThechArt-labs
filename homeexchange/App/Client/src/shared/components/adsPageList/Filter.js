import React from "react";
import "./filter.scss";
function Filter({ type, onChange }) {
  const template = ["all", "lease", "rent"];
  return (
    <ul className="filter">
      {template.map((content, id) => (
        <li className="filter__option filter-option" key={id}>
          <button
            className={`filter-option__btn${
              type === id ? " filter-option__btn--selected" : ""
            }`}
            onClick={(e) => {
              onChange(e);
            }}
            value={id}
          >
            {content}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Filter;
