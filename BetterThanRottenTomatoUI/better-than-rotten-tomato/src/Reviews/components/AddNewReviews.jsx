import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { addMovieReviews } from '../../Services/ReviewManagementService';
import React, { Fragment } from 'react';
import StarRating from './StarRating';

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
    };
  }

  componentDidMount() {
    const {id} = this.props;
    this.setState({movieId: id});
  }

  validateFields = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case 'displayNameInput':
        this.setState({ username: value });
        this.setState({validDisplayName: (value !== '')? true: false}, () => { this.validateForm() });
        break;
      case 'ratingInput':
        this.setState({ rating: value });
        this.setState({validRating: (value > 0)? true : false}, () => { this.validateForm() });
        break;
      case 'commentInput':
        this.setState({ comment: value });
        this.setState((prevState) =>{
          return {...prevState, validComment: (value !== '')? true: false};
        }, () => { this.validateForm() });
        break;
    }

  };  

  validateForm = () => {
    this.setState({ validForm: (this.state.validDisplayName && this.state.validRating && this.state.validComment)? true: false });
  };
  
  resetForm = () => {
    this.setState({username: ''});
    this.setState({rating: 0 });
    this.setState({comment:''});
    this.setState({validForm: false});
    this.setState({validDisplayName: false});
    this.setState({validComment: false});
    this.setState({validRating: false});
  }

  submitNewReviewForm = async function(event){
    event.preventDefault();
    try{
      await addMovieReviews(
          this.state.movieId,
          this.state.username,
          this.state.rating,
          this.state.comment
        );
    }catch(e){
      alert(e);
    }
    this.resetForm();
  };

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
                  <StarRating />
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
                  onClick={(event) => this.submitNewReviewForm(event)}
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
