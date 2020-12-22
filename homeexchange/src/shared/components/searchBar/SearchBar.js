import React from "react";
import "./search-bar.scss";
function SearchBar({ onChange, val, onSearchClick, isOpen }) {
  const show = val?.length > 0;
  return (
    <div
      className={`search-bar-container${
        show || isOpen ? " search-bar-container--show" : ""
      }`}
    >
      <input
        type="text"
        placeholder="Search by location..."
        autoFocus={show || isOpen}
        value={val}
        onChange={(e) => onChange(e)}
      />
      <div className="search" onClick={onSearchClick}></div>
    </div>
  );
}

export default SearchBar;
