import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StarRating from '../../shared/components/starRating/StarRating';
import { loadProfileRating, setProfileRating } from '../../shared/redux/profileRating/profileRating';

function RatingControl({profileId}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadProfileRating(profileId));
        return () => {
            
        }
    }, [])
    const profileRating = useSelector((state) => state.profileRating)
    const handleClick = (mark, e) => {
        console.log(mark);
        dispatch(setProfileRating({targetId: profileId, mark: mark}));
    }
    return (
        <div>
        <StarRating currentRating={profileRating} handleClick={handleClick}/>
        </div>
    )
}

export default RatingControl
