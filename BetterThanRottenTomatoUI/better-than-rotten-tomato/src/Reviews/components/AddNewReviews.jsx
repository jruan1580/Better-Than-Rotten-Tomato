import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { addMovieReviews } from '../../Services/ReviewManagementService';
import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import '../reviewsStyles.css';

//validate form
// should return formValid bool
const validateForm = () => {};

//on submit
async function handleSubmit(submitEvent) {
  submitEvent.preventDefault();

  try {
    await addMovieReviews(
      submitEvent.target.movieId.value,
      submitEvent.target.username.value,
      submitEvent.target.rating.value,
      submitEvent.target.comment.value
    );
  } catch (e) {}
}

export default function AddNewReviewForm() {
  return (
    <>
      <h3>Add new movie review</h3>
      <form>
        <Row>
          <Col>
            <label> Display Name</label>
            <br />
            <input type="text" />
          </Col>
          <Col>
            <Row>
              <label> Rating </label>{' '}
            </Row>
            <input />
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <label>Comment</label>
            </Row>
            <input type="text" />
          </Col>
        </Row>
        <Row className="spacing">
          <Col>
            <Button variant="dark">
              Submit
            </Button>
          </Col>
        </Row>
      </form>
    </>
  );
}
