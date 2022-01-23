import ExistingReviews from './components/ExistingReviews';
import MovieSummary from './components/MovieSummary';
import ReviewForm from './components/AddNewReviews';
import { useParams } from 'react-router';

export default function Reviews() {
  const {id} = useParams();
  return (
    <>
      <MovieSummary movieId={id} />
      <ReviewForm id={id} />
      <ExistingReviews movieId={id} /> 
    </>
  );
}
