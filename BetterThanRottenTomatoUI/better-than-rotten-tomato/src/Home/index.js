import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';
import MovieList from "./MovieList";
import SideBar from "./SideBar";

function Home(){
    return(
        <>
            <Row>
                <Col lg="3">
                    <SideBar />
                </Col>
                <Col lg="8">
                    <MovieList />
                </Col>
            </Row>           
        </>
        
    );
}

export default Home;