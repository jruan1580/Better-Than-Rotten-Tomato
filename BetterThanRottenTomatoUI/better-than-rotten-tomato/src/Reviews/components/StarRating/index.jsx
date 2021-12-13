import {StarIcon, RatingIcon} from './Icons';
import React, {useState} from 'react';

const StarRating= () => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0); 
    const onMouseEnter = (index) => {
      setHoverRating(index);
    };
    const onMouseLeave = () => {
      setHoverRating(0);
    };
    const onSaveRating = (index) => {
      setRating(index);
    };
    return(
      <div className="box flex">
        {[1, 2, 3, 4, 5].map((index) => {
          return (
            <RatingIcon 
              index={index} 
              rating={rating} 
              hoverRating={hoverRating} 
              onMouseEnter={onMouseEnter} 
              onMouseLeave={onMouseLeave} 
              onSaveRating={onSaveRating} />
          )
        })}
      </div>
    );

}

export default StarRating; 
  /** https://javascript.plainenglish.io/how-to-build-a-star-rating-component-in-react-dad06b05679b */