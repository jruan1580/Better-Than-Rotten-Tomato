import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { getGenres } from '../Services/MovieManagementService';

function SideBar({ setCategorySelectedCallback, setSearchInput }){
    const [genres, setGenres] = useState([]);
    const [genresSelected, setSelectedGenres] = useState([]);

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

    const categoryChanged = (e) => {
        //something was checked, add it to selected genres list
        if (e.target.checked){
            setSelectedGenres([...genresSelected, e.target.name]);
            setCategorySelectedCallback([...genresSelected, e.target.name]);
        }else{
            //some was unchecked, remove from selected genres list
            const newArr = genresSelected.filter(g => g !== e.target.name);
            setSelectedGenres(newArr);
            setCategorySelectedCallback(newArr);
        }
    }

    const searchChanged = (e) =>{
        setSearchInput(e.target.value);
    }

    return(
        <Form>
            <Row>
                <Col lg="11">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Search" onChange={searchChanged} />
                    </Form.Group>      
                </Col>
            </Row>
            <Row>
                <Col lg="12">
                    <h5>Genres</h5>       
                    {genres.map((movieGenre) => {
                        return <Form.Check
                            name={movieGenre.genre}
                            key={movieGenre.id}
                            type="checkbox"
                            id={movieGenre.id}
                            label={movieGenre.genre}
                            onChange={categoryChanged}
                        />
                    })}           
                </Col>
            </Row>                        
        </Form>
    );
}

export default SideBar;