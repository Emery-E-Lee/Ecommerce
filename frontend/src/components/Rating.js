import React from 'react';
import { Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function Rating(props) {
  const { rating, numReviews } = props;

  return (
    <div className="rating">
      <span>
        {rating >= 1 ? (
          <StarIcon />
        ) : rating >= 0.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
      <span>
        {rating >= 2 ? (
          <StarIcon />
        ) : rating >= 1.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
      <span>
        {rating >= 3 ? (
          <StarIcon />
        ) : rating >= 2.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
      <span>
        {rating >= 4 ? (
          <StarIcon />
        ) : rating >= 3.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
      <span>
        {rating >= 5 ? (
          <StarIcon />
        ) : rating >= 4.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
      <span className="rating-review-num">후기 {numReviews} 개</span>
    </div>
  );
}

export default Rating;
