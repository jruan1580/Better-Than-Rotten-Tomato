import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getReviews } from '../../Services/ReviewManagementService'
import React, {useState} from 'react'

export default function ExistingReviews(movieId){
    const [movieReviews, setMovieReviews] = useState([]);

    //call the get service 
    async function getMovieReviews (pageNumber = 1 ){
        try{ 
            const data =  await getReviews(parseInt(movieId.movieId), pageNumber);
            setMovieReviews(...movieReviews, data.reviewsList); 
            console.log(data.reviewsList);
        }
        catch(e){ console.log(e);}
    } 
    //store the reviews is a table of 10
    const offset = 10;
    //how to store the page 
    //have a button to expand for 10 more reviews 
    return(
        <>
                {movieReviews.map((movieReview) => {
                    return(
                        <div key={movieReview.id}>
                        <Row>
                            <Col>
                                {movieReview.username}
                            </Col>
                            <Col>
                                {movieReview.comment}
                            </Col>
                            <Col>
                                {movieReview.rating}
                            </Col>
                        </Row>
                        </div>
                    )
                })}
                <Button className="mt-5" onClick={() => getMovieReviews()}> Load more </Button> 
        </>
    );
};