import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { addMovieReviews } from '../../Services/ReviewManagementService';
import React, { Fragment } from 'react';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieId: 0,
      username: '',
      rating: 0,
      comment: '',
      validForm: false,
      validDisplayName: false,
      validComment: false,
      validRating: false,
      validFields: false,
    };

    this.getMovieId();
  }

  validateFields = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case 'displayNameInput':
        this.setState({ username: value });
        if (value !== '') {
          this.setState({ validDisplayName: true });
        }
        break;
      case 'ratingInput':
        this.setState({ rating: value });
        if (value > 0) {
          this.setState({ validRating: true });
        }
        break;
      case 'commentInput':
        this.setState({ comment: value });
        if (value !== '') {
          this.setState({ validComment: true });
        }
        break;
    }

    this.validateForm();
  };

  validateForm = () => {
    this.state.validFields =
      this.state.validDisplayName &&
      this.state.validRating &&
      this.state.validComment;
    this.setState({ validForm: this.state.validFields });
  };

  getMovieId = () => {
    let urlString = window.location.href;
    this.state.movieId = parseInt(urlString.slice(31));
  };

  submitNewReviewForm() {
    try {
      addMovieReviews(
        this.state.movieId.value,
        this.state.username.value,
        this.state.rating.value,
        this.state.comment.value
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
                  disabled={!this.state.validForm}
                  onSubmit={this.submitNewReviewForm()}
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
