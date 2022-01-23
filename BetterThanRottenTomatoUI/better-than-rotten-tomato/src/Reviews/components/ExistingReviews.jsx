import * as Bootstrap from 'react-bootstrap';
import { getReviews } from '../../Services/ReviewManagementService';
import React, { useEffect, useRef, useState } from 'react';

export default function ExistingReviews(movieId) {
  const [movieReviews, setMovieReviews] = useState([]);
  const [endOfReviewList, setEndOfReviewList] = useState(false); 
  const page = useRef(1);

  async function getMovieReviews(pageNumber) {
    try {
      const data = await getReviews(parseInt(movieId.movieId), pageNumber);
      if(!data)
      {
        setEndOfReviewList(true);
        return; 
      }
      setMovieReviews((prevReviews) => {
        return prevReviews.concat(data.reviewsList);
      });
    } catch (e) {
      console.log(e);
    }
  }
  
  async function updatePage(){
    if(!endOfReviewList)
    {
      page.current = page.current + 1; 
      await getMovieReviews(page.current);
    }
  }

  useEffect(() => {
    (async function () { await getMovieReviews(page.current)})();
  }, [])

  useEffect(() => {
    if(movieReviews.length > 0)
    {
      setEndOfReviewList(movieReviews.length === movieReviews[0].total); 
    }
  }, [movieReviews]);

  return (
    <>
    <h3 className='mt-5'>Reviews</h3>
      <Bootstrap.Table className='mt-3' bordered striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Comment</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
        {movieReviews.map((movieReview) => {
        return (
          <tr key={movieReview.id}>
              <td>{movieReview.username}</td>
              <td>{movieReview.comment}</td>
              <td>{movieReview.rating}</td>
          </tr>
        );
      })}
        </tbody>
      </Bootstrap.Table>
      <Bootstrap.Button className="my-3" onClick={() => updatePage()} disabled={endOfReviewList}>
        Load more
      </Bootstrap.Button>
    </>
  );
}
