import { addMovieReviews } from '../../Services/ReviewManagementService';
import React, { Fragment, Form, Row, Column } from 'react';

//validate form 
// should return formValid bool
const validateForm = () => {

}

//on submit 
async function handleSubmit (submitEvent){
  submitEvent.preventDefault();

  try{
    await addMovieReviews(submitEvent.target.username.value, submitEvent.target.rating.value, submitEvent.target.comment.value);

  }
  catch(e)
  {

  }
}

export default async function AddNewReviewForm(username, rating, comment) {
  return (
    <>
      <h3>Add New Review</h3>
      <Form>
        <Row>
          <Column>
            <label> Display Name</label>
            <input type="text" value={username}/>
          </Column>
          <Column>
            <label> Rating </label>
            <input value={rating}/>
          </Column>
        </Row>
        <Row>
          <Column>
            <label> Comment </label>
            <input type="text" value={comment} onChange={validateForm}/>
          </Column>
        </Row>
        <Row>
          <Column>
            <button role="button" type="submit" onSubmit={handleSubmit}>Submit</button>
          </Column>
        </Row>
      </Form>
    </>
  );
};
