import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import NavigationBar from './Navbar';
import Container from 'react-bootstrap/Container';

function App() {
  return(
    <>
      <NavigationBar />
      <br/><br/>
      <Container>
        <Home/>
      </Container>      
    </>
  );  
}

export default App;
