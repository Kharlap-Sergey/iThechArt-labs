import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "shared/components/starRating/StarRating";
import {
  loadProfileRating,
  setProfileRating,
} from "shared/redux/profileRating/thunkActions";
import { clearProfileRatingAction } from "shared/redux/profileRating/actions";
import { selectProfileRating } from "shared/redux/profileRating/selectors";
import "./rating-control.scss";

const reducer = (accumulator, currentValue) => accumulator + currentValue.mark;

function calculateRating(rating) {
  if (rating.length < 1) return 0;
  const sum = rating.reduce(reducer, 0);
  return sum / rating.length;
}

function RatingControl({ profileId }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProfileRating(profileId));
    return () => {
      dispatch(clearProfileRatingAction());
    };
  }, []);

  const ratings = useSelector((state) => selectProfileRating(state));
  const handleClick = (mark) => {
    dispatch(setProfileRating({ targetId: profileId, mark: mark }));
  };
  return (
    <div className="rating-control">
      <StarRating
        currentRating={calculateRating(ratings)}
        handleClick={handleClick}
      />
      <div className="rating-control__info">{ratings.length} votes</div>
    </div>
  );
}

RatingControl.propTypes = {
  profileId: PropTypes.number.isRequired,
};
export default RatingControl;
