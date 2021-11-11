import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { addMovieReviews } from '../../Services/ReviewManagementService';
import React, { Fragment } from 'react';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      rating: 0,
      comment: '',
      invalidForm: true,
      invalidDisplayName: true,
      invalidComment: true,
      invalidRating: true,
    };

    this.validateFields = this.validateFields.bind(this);
  }

  validateFields = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case 'displayNameInput':
        this.setState({ username: value });
        this.state.invalidDisplayName = value !== '' ? false : true;
        break;
      case 'ratingInput':
        this.setState({ rating: value });
        this.state.invalidRating = value > 0 ? false : true;
        break;
      case 'commentInput':
        this.setState({ comment: value });
        this.state.invalidComment = value !== '' ? false : true;
        break;
    }

    this.validateForm();
  };

  validateForm = () => {
    console.log(`dn ${this.state.invalidDisplayName}`);console.log(`iR ${this.state.invalidRating}`);console.log(`comment ${this.state.invalidComment}`);
    console.log(`invalidForm ${this.state.invalidForm}`);

    const invalidFields = (this.state.invalidDisplayName && this.state.invalidRating && this.state.invalidComment);
    console.log(`invalidFields ${this.state.invalidFields}`);
    this.setState({
      invalidForm:
      invalidFields
    });
    console.log(`invalidForm ${this.state.invalidForm}`);
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
  }

  render() {
    return (
      <>
        <div className="container">
          <h3>Add new movie review</h3>
          <form className="border p-4">
            <Row>
              <Col>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="displayNameInput"
                    placeholder="Display Name"
                    value={this.state.username}
                    onChange={(event) => this.validateFields(event)}
                  />
                </div>
              </Col>
              <Col>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="ratingInput"
                    placeholder="Rating"
                    value={this.state.rating}
                    onChange={(event) => this.validateFields(event)}
                  />
                </div>
              </Col>
            </Row>
            <Row className="pt-3">
              <div className="form-group">
                <textarea
                  className="form-control"
                  name="commentInput"
                  placeholder="Comment"
                  value={this.state.comment}
                  onChange={(event) => this.validateFields(event)}
                />
              </div>
            </Row>
            <Row>
              <Col>
                <Button
                  type="submit"
                  className="btn btn-dark mt-3"
                  disabled={this.state.invalidForm}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </form>
        </div>
      </>
    );
  }
}

export default ReviewForm;
