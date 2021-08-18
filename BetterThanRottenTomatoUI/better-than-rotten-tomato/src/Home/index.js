import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function Home(){
    return(
        <>
            <div></div>
            <Col lg="2">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Search" />
                    </Form.Group>      
                    <h5>Genres</h5>          
                    <Form.Check 
                        type="checkbox"
                        id="1"
                        label="Scary/Horror"
                    />
                     <Form.Check 
                        type="checkbox"
                        id="2"
                        label="Comedy"
                    />
                     <Form.Check 
                        type="checkbox"
                        id="1"
                        label="Romance"
                    />
                    <Form.Check 
                        type="checkbox"
                        id="1"
                        label="RomCom"
                    />
                </Form>
            </Col>
            <Col lg="9">

            </Col>
        </>
        
    );
}

export default Home;