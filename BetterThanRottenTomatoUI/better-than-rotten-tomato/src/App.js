import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import NavigationBar from './NavigationBar';
import Home from './Home';

function App() {
  return(
    <>
      <NavigationBar />
      <br/><br/>
      <Container>
        <Home />
      </Container>
    </>
  );  
}

export default App;
