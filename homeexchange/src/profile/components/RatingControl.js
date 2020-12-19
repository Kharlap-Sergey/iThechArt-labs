import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StarRating from '../../shared/components/starRating/StarRating';
import { loadProfileRating, setProfileRating } from '../../shared/redux/profileRating/profileRating';
import { clearProfileRatingAction } from '../../shared/redux/profileRating/profileRatingActionCreator';
import './rating-control.scss';

const reducer = (accumulator, currentValue) => accumulator + currentValue.mark;

function calculateRating(rating) {
    console.log('rating', rating)
    if (rating.length < 1) return 0;
    const sum = rating.reduce(reducer, 0);
    console.log('sum', sum)
    return sum / rating.length;
}

function RatingControl({ profileId }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadProfileRating(profileId));
        return () => {
            dispatch(clearProfileRatingAction());
        }
    }, [])
    const ratings = useSelector((state) => state.profileRating)
    const handleClick = (mark, e) => {
        console.log(mark);
        dispatch(setProfileRating({ targetId: profileId, mark: mark }));
    }
    return (
        <div className="rating-control">
            <StarRating currentRating={calculateRating(ratings)} handleClick={handleClick} />
            <div className="rating-control__info">
                {ratings.length} votes
            </div>
        </div>
    )
}

export default RatingControl
