import React from "react";
import "./filter.scss";
function Filter({ type, onChange }) {
  const template = [
    { content: "lease", type: 1 },
    { content: "rent", type: 2 },
  ];
  return (
    <ul className="filter">
      {template.map((element) => (
        <li className="filter__option filter-option" key={element.type}>
          <button
            className={`filter-option__btn${
              type[element.type] ? " filter-option__btn--selected" : ""
            }`}
            onClick={(e) => {
              onChange(e);
            }}
            value={element.type}
          >
            {element.content}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Filter;
