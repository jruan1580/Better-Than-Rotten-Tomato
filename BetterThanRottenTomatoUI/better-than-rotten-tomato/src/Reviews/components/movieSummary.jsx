import * as React from 'react'
import { useState } from 'react'
import * as Bootstrap from 'react-bootstrap'
import { getMovieSummary } from '../../Services/ReviewManagementService'

function MovieSummary(movieId){
    const [movieSummary, setMovieSummary] = React.useState({
        MovieName: 'MovieName',
        AvgRating: 0,
        Description: '',
        Picture: ''
    });
    
    async function getSummary() {
        try {
          const data = await getMovieSummary(parseInt(movieId.movieId));
        //   setMovieSummary(data);
        } catch (e) {
          console.log(e);
        }
      }

      React.useEffect(async () => {
          await getSummary();
      }, []);
    return (
    <>
    {/* TODO:
        - Add name, description, picture, average rating
        - Create method to pull data 
        - Have average rating display as stars */}
        <h3>Movie Info </h3> 
        <Bootstrap.Row>
            <Bootstrap.Col>
            <img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600" />
            </Bootstrap.Col>
            <Bootstrap.Col>
                <h3>{movieSummary.MovieName}</h3>
                <Bootstrap.Row>
                <h5>Average Rating</h5>
                </Bootstrap.Row>
                <Bootstrap.Row>
                <p className='justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam pariatur ab, rem rerum nisi repellat saepe perspiciatis fuga, sapiente ut illum facere, accusantium animi laudantium fugit nam tenetur sit dolore?</p>
                </Bootstrap.Row>
            </Bootstrap.Col>
        </Bootstrap.Row>
    </>
    )
}

export default MovieSummary; 