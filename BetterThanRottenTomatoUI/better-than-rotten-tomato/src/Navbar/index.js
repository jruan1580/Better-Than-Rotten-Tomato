import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

function NavigationBar(){
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Navbar.Brand href="#">Better Than Rotten Tomato</Navbar.Brand>
                        <Nav.Link href="#">Home</Nav.Link>
                    </Nav>
                </Container>                
            </Navbar>
        </>         
    );
}

export default NavigationBar;