import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import NavigationBar from './NavigationBar';
import Home from './Home';
import Reviews from './Reviews';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Container>
          <Switch>
            <Route path= '/reviews/:id' children={<Reviews />} />
            <Route path='*'>
              <Home />
            </Route>
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
