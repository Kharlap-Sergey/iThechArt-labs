import React from "react";

function Filter({ type, onChange }) {
  return (
    <div>
      <label htmlFor="filter-all">all</label>
      <input
        type="radio"
        checked={type==0}
        id="filter-all"
        name="filter"
        value={0}
        onChange={(e) => {onChange(e)}}
      />
      <label htmlFor="filter-rent">rent</label>
      <input
        type="radio"
        checked={type==2}
        id="filter-rent"
        name="filter"
        value={2}
        onChange={(e) => {onChange(e)}}
      />
      <label htmlFor="filter-rent">lease</label>
      <input
        type="radio"
        checked={type==1}
        id="filter-lease"
        name="filter"
        value={1}
        onChange={(e) => {onChange(e)}}
      />
    </div>
  );
}

export default Filter;
