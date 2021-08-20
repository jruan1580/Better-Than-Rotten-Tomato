import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

async function getGenres(){
    const baseUrl = process.env.REACT_APP_MOVIES_MANAGEMENT_BASE_URL;
    const response = await fetch(baseUrl + '/genres');
    
    if (response.status !== 200){
        throw new Error('response is not 200');
    }
    
    return await response.json();
}

function SideBar(){
    const [genres, setGenres] = useState([]);

    useEffect(() =>{
        (async function(){
            try{
                const genre = await getGenres();
                console.log(genre);
                setGenres(genre);
            }
            catch(e){
                console.log('error occurred while fetching genres.');
            }            
        })();            
    }, []);

    return(
        <Form>
            <Row>
                <Col lg="11">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Search" />
                    </Form.Group>      
                </Col>
            </Row>
            <Row>
                <Col lg="12">
                    <h5>Genres</h5>       
                    {genres.map((movieGenre) => {
                        return <Form.Check
                            key={movieGenre.id}
                            type="checkbox"
                            id={movieGenre.id}
                            label={movieGenre.genre}
                        />
                    })}           
                </Col>
            </Row>                        
        </Form>
    );
}

export default SideBar;