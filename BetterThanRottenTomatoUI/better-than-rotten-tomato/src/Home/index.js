import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';
import MovieList from "./MovieList";
import SideBar from "./SideBar";

function Home(){
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState(null);

    const setSelectedCategories = (categoriesPicked) =>{
        setCategories(categoriesPicked);
    }

    const setSearchInput = (input) =>{
        setSearch(input);
    }

    return(
        <>
            <Row>
                <Col lg="3" xs="4">
                    <SideBar setCategorySelectedCallback={setSelectedCategories} setSearchInput={setSearchInput}/>
                </Col>
                <Col lg="8" xs="7">
                    <MovieList categories={categories} search={search} />
                </Col>
            </Row>           
        </>
        
    );
}

export default Home;