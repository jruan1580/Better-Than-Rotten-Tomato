import * as React from 'react'
import * as Bootstrap from 'react-bootstrap'
import { getMovieSummary } from '../../Services/ReviewManagementService'
import {StaticStarRating} from './StarRating/index'

function MovieSummary(movieId){
    const [movieSummary, setMovieSummary] = React.useState({
        movieName: 'MovieName',
        averageRating: 0,
        description: '',
        picture: ''
    });
    
    async function getSummary() {
        try {
          const data = await getMovieSummary(parseInt(movieId.movieId));
          setMovieSummary(data);
        } catch (e) {
          console.log(e);
        }
      }

      React.useEffect(async () => {
          await getSummary();
      }, []);
    return (
    <>
        <h3 className='mb-3'>{movieSummary.movieName}</h3> 
        <Bootstrap.Row className='border p-5'>
            <Bootstrap.Col sm={4}>
            { <Bootstrap.Image style={{width:'220px', height:'360px'}} src={`data:image/jpeg;base64,${movieSummary.picture}`} rounded/> }
            </Bootstrap.Col>
            <Bootstrap.Col xs={12} sm={4} md={8}>
                <Bootstrap.Row>
                    <StaticStarRating rating={movieSummary.averageRating} />
                </Bootstrap.Row>
                <Bootstrap.Row>
                    <p className="justify">{movieSummary.description}</p>
                </Bootstrap.Row>
            </Bootstrap.Col>
        </Bootstrap.Row>
    </>
    )
}

export default MovieSummary; 