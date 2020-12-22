import React from "react";
import "./filter.scss";
function Filter({ type, onChange }) {
  return (
    <ul className="filter">
      <li className="filter__option filter-option">
        <input
          type="radio"
          checked={type == 0}
          id="filter-all"
          name="filter"
          value={0}
          onChange={(e) => {
            onChange(e);
          }}
        />
        <label className="filter-option__text" htmlFor="filter-all">
          all
        </label>
      </li>
      <li className="filter__option filter-option">
        <input
          type="radio"
          checked={type == 2}
          id="filter-rent"
          name="filter"
          value={2}
          onChange={(e) => {
            onChange(e);
          }}
        />
        <label className="filter-option__text" htmlFor="filter-rent">
          rent
        </label>
      </li>
      <li className="filter__option filter-option">
        <input
          type="radio"
          checked={type == 1}
          id="filter-lease"
          name="filter"
          value={1}
          onChange={(e) => {
            onChange(e);
          }}
        />
        <label className="filter-option__text" htmlFor="filter-rent">
          lease
        </label>
      </li>
    </ul>
  );
}

export default Filter;
