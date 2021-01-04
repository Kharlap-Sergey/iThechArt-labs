import React from "react";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import "./painted-link.scss";

function PaintedLink({ to, value }) {
  return (
    <Link to={to} className="painted-link" data-item-content={value}>
      {value}
    </Link>
  );
}

PaintedLink.propTypes = {
  to: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default PaintedLink;
