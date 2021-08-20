import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

function MovieList(){
    const [currentPage, setCurrentPage] = useState(1);
    const offset = 12;

    useEffect(() =>{

    }, [currentPage]);
    
    return(
        <>
            <Row>
                <Col lg="10">
                    <h1>Movies</h1>
                </Col>
                <Col lg="2">
                    <Button variant="dark">Add Movie</Button>
                </Col>
            </Row>
            <Row>
                
            </Row>
        </>
    );
}

export default MovieList;