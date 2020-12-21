import React from "react";
import "./search-bar.scss";
function SearchBar() {
  return (
    <div className="search-bar-container">
      <input type="text" placeholder="Search..." />
      <div className="search"></div>
    </div>
  );
}

export default SearchBar;
