import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { addMovieReviews } from '../../Services/ReviewManagementService';
import React, { Fragment, useState } from 'react';

class ReviewForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      rating: 0,
      comment: '',
      invalidForm: true
    }
  }
  //validate form
// should return formValid bool
 validateForm = (event) => {
   const name = event.target.name;
   const value = event.target.value;

   this.setState({[name]: value});
};


//on submit
submitNewReviewForm(submitEvent) {
  try {
     addMovieReviews(
      submitEvent.target.movieId.value,
      submitEvent.target.username.value,
      submitEvent.target.rating.value,
      submitEvent.target.comment.value
    );
  } catch (e) {}
};

  render(){
    return (
      <>
        <div className="container">
          <h3>Add new movie review</h3>
          <form className="border p-4">
            <Row>
              <Col>
              <div className="form-group">
                <input type="text" 
                  className="form-control" 
                  name="displayNameInput" 
                  placeholder="Display Name" 
                  value={this.state.username}
                  onChange={(event) => this.validateForm(event)}/>
              </div>
              </Col>
              <Col>
              <div className="form-group">
                <input 
                  className="form-control" 
                  name="ratingInput" 
                  placeholder="Rating" 
                  value={this.state.rating}/>
              </div>
              </Col>
            </Row>
            <Row className='pt-3'>
              <div className="form-group">
                <textarea 
                  className="form-control" 
                  name="commentInput" 
                  placeholder="Comment" 
                  value={this.state.comment} 
                  onChange={(event) => this.validateForm(event)}/>
              </div>
            </Row>
            <Row>
              <Col>
                <Button type="submit" className="btn btn-dark mt-3" disabled={this.state.invalidForm}>
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


