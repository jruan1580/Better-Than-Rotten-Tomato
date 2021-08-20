import Form from "react-bootstrap/Form";

async function getGenres(){
    
}

function SideBar(){
    console.log(process.env);
    console.log(process.env.REACT_APP_MOVIES_MANAGEMENT_API);
    return(
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
    );
}

export default SideBar;