import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { getGenres, addNewMovie } from '../Services/MovieManagementService';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

function validateInputs(name, description, year, pictureFiles){
    let errMsg = '';
    let number = 1;

    if (name === undefined || name == null || name === ''){
        errMsg +=  (number + '. Name is undefined\n');
        number++;
    }

    if (description === undefined || description == null || description === ''){
        errMsg += (number + '. Description is undefined\n');
        number++;
    }

    if (year <= 0){
        errMsg += (number + '. Year needs to be greater than 0\n');
        number++;
    }

    if (pictureFiles.length <= 0){
        errMsg += (number + '. Picture was not supplied\n');
        number++;
    }

    return errMsg;
}

function AddMovie({showModal, setModal}){
    const [genres, setGenres] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() =>{
        (async function(){
            try{
                const genre = await getGenres();

                setGenres(genre);
            }
            catch(e){
                alert('Failed to fetch genres with error: ' + e.message);
            }            
        })(); 
    }, []);

    const handleSubmit = (submitEvent) => {    
        submitEvent.preventDefault();

        let validationRes = validateInputs(submitEvent.target.movieName.value, submitEvent.target.movieDescription.value, submitEvent.target.movieYearReleased.value, submitEvent.target.moviePicture.files);
        if (validationRes !== ''){
            alert('Invalid inputs:\n\n' + validationRes);

            return;
        }

        var fileReader = new FileReader();
        fileReader.readAsArrayBuffer(submitEvent.target.moviePicture.files[0]);
        fileReader.onload =  (e) => {
            if (e.target.readyState === FileReader.DONE){
                let uintArray = new Uint8Array(e.target.result);  
                var binary = '';
                var len = uintArray.byteLength;
                for (var i = 0; i < len; i++) {
                    binary += String.fromCharCode(uintArray[i]);
                }
                
                (async function(){
                    try{
                        await addNewMovie(submitEvent.target.movieName.value, submitEvent.target.movieDescription.value, submitEvent.target.movieGenre.value, submitEvent.target.movieYearReleased.value, btoa(binary));
        
                        submitEvent.target.reset();
                        
                        setShowSuccess(true);
                    }catch(e){
                        alert('Failed to add movie with error: ' + e.message);
                    }        
                })();
            }                       
        }       
    }

    const hideModal = () => {
        setShowSuccess(false);

        setModal(false);
    }

    return(
        <>
            <Modal show={showModal} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Movie</Modal.Title>
                </Modal.Header>

                <Modal.Body> 
                    {showSuccess && <Alert variant='success'>Movie successfuly added</Alert>}                  
                    <Form onSubmit={handleSubmit}>
                        <Row className='mb-3'>
                            <Form.Group as={Col} lg='10'>
                                <Form.Label htmlFor ='movieName'>Name</Form.Label>
                                <Form.Control type='input' placeholder='Movie Name' name='movieName' max='500'/>
                            </Form.Group>
                        </Row>
                        
                        <Row className='mb-3'>
                            <Form.Group >
                                <Form.Label htmlFor ='movieDescription'>Description</Form.Label>
                                <Form.Control as='textarea' placeholder='Description' name='movieDescription' />
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group>
                                <Form.Label htmlFor = 'moviePicture'>Picture</Form.Label>
                                <Form.Control type="file" name='moviePicture'accept="image/png, image/jpeg" />
                            </Form.Group>
                      
                        </Row>
                       
                        <Row className='mb-3'>
                            <Form.Group as={Col} lg='6'>
                                <Form.Label htmlFor ='movieGenre'>Genre</Form.Label>
                                <Form.Select name='movieGenre'>
                                    {
                                        genres.map((movieGenre) => {
                                            return <option value={movieGenre.id} key={movieGenre.id}>{movieGenre.genre}</option>
                                        })
                                    } 
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} lg='6'>
                                <Form.Label htmlFor='movieYearReleased'>Year Released</Form.Label>
                                <Form.Control type='number' name='movieYearReleased' min='1'/>
                            </Form.Group>
                        </Row>

                        
                    
                        <Form.Group as={Row} className="mb-3">
                            <Col lg='6'>
                                <Button variant='primary' type='submit'>Add Movie</Button>
                            </Col>
                         
                        </Form.Group>
                    </Form>
                 </Modal.Body>                
            </Modal>
        </>
    );
}

export default AddMovie;