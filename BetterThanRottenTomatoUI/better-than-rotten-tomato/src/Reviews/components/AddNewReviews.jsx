import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { addMovieReviews } from '../../Services/ReviewManagementService';
import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import '../reviewsStyles.css';

class ReviewForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      rating: 0,
      comment: ''
    }
  }
  render(){
    return (
      <>
        <div className="container">
          <h3>Add new movie review</h3>
          <form className="border p-5">
            <Row>
              <Col>
              <div className="form-group">
                <label htmlFor="displayNameInput"> Display Name</label>
                <input type="text" className="form-control" name="displayNameInput"/>
              </div>
              </Col>
              <Col>
              <div className="form-group">
                <label htmlFor="ratingInput"> Rating </label>
                <input className="form-control" name="ratingInput"/>
              </div>
              </Col>
            </Row>
            <Row>
              <div className="form-group">
                <label htmlFor="commentInput">Comment</label>
                <textarea className="form-control" name="commentInput"></textarea>
              </div>
            </Row>
            <Row>
              <Col>
                <Button type="submit" className="btn btn-dark mt-3" disabled={invalidForm}>
                  Submit
                </Button>
              </Col>
            </Row>
          </form>
        </div>
      </>
    );
  };
}

export default ReviewForm;

let invalidForm = true;
//validate form
// should return formValid bool
const validateForm = () => {};

//on submit
async function submitNewReviewForm(submitEvent) {
  try {
    await addMovieReviews(
      submitEvent.target.movieId.value,
      submitEvent.target.username.value,
      submitEvent.target.rating.value,
      submitEvent.target.comment.value
    );
  } catch (e) {}
};