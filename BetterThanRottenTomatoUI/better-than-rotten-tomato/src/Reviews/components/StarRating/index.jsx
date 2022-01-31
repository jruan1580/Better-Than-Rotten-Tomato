import {RatedIcon, RatingIcon} from './Icons';
import React, {useState} from 'react';

export const StaticStarRating = (props) => {
  const {rating} = props;
  return(
    <span>
      {[1,2,3,4,5].map((index) => {
        return(
          <RatedIcon key={index} currentIndex={index} rating={rating} />
        )
      })}
    </span>
  )
}

const StarRating = (props) => {
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
    props.setRatingValue(index);
  };
  
  return(
      <>
        {[1, 2, 3, 4, 5].map((index) => {
          return (
            <RatingIcon 
              key={index}
              index={index} 
              rating={rating} 
              hoverRating={hoverRating} 
              onMouseEnter={onMouseEnter} 
              onMouseLeave={onMouseLeave} 
              onSaveRating={onSaveRating} />
          )
        })}
      </>
    );

}

export default StarRating; 