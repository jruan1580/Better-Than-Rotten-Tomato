import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Pagination from 'react-bootstrap/Pagination';
import { Fragment, useEffect, useState } from 'react';

async function getMovies(categories, search, page, offset){
    var baseUrl = process.env.REACT_APP_MOVIES_MANAGEMENT_BASE_URL;
    var data = { genres: categories, search, page, offset };

    var response = await fetch(baseUrl + '/movies/get/param',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    if (response.status !== 200){
        throw new Error('Failed to fetch movies');
    }

    return await response.json();
}

function MovieList({categories, search}){
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesByRows, setMoviesByRows] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);

    const offset = 6;

    //only grab movies when currentPage changes
    useEffect(() =>{
        (async function(){
            try{
                var movieResp = await getMovies(categories, search, currentPage, offset);                
                var currMovieRow = [];
                var allMoviesByRows = [];

                //add each movie in rows of 3
                for (var i = 0; i < movieResp.movieList.length; i++){
                    if ((i % 3 === 0) && i !== 0){
                        allMoviesByRows.push(currMovieRow);
                        currMovieRow = [];
                        currMovieRow.push(movieResp.movieList[i]);
                    }else{
                        currMovieRow.push(movieResp.movieList[i]);
                    }                    
                }

                if (currMovieRow.length > 0){
                    allMoviesByRows.push(currMovieRow);
                }                

                setTotalRecords(movieResp.totalRecords);
                setMoviesByRows(allMoviesByRows);
            }catch(e){
                console.log(e.message);
            }
        })()
    }, [currentPage, categories, search]);

    return(
        <>
            <Row>
                <Col lg="10">
                    <h1>Movies</h1>
                </Col>
                <Col lg="2">
                    <Button variant="dark">Add Movie</Button>
                </Col>
            </Row><br/>
            {               
                moviesByRows.map((movieRow, index) => {                    
                    return (
                        <Fragment key={index+1}>
                            <Row>
                            {
                                movieRow.map((movie) => {
                                    return <Col lg="4" key={movie.id}>
                                        <div>
                                            { <Image style={{width:'220px', height:'360px'}} src={`data:image/jpeg;base64,${movie.picture}`} rounded/> }
                                        </div>
                                        <label><b>{movie.name}</b></label>
                                    </Col>
                                })
                            }                        
                            </Row><br/>
                        </Fragment>
                    );
                })
            }  
            <br/>
            <Pagination>
                {(currentPage !== 1 && moviesByRows.length > 0) && <Pagination.First onClick={() => setCurrentPage(1)} />}
                {(currentPage !== 1 && moviesByRows.length > 0) && <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />}
                {(moviesByRows.length > 0 && currentPage !== ((totalRecords % offset === 0 && totalRecords !== 0) ? parseInt(totalRecords / offset) : (parseInt(totalRecords / offset) + 1))) && <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)}/>}
                {(moviesByRows.length > 0 && currentPage !== ((totalRecords % offset === 0 && totalRecords !== 0) ? parseInt(totalRecords / offset) : (parseInt(totalRecords / offset) + 1))) &&<Pagination.Last onClick={() => setCurrentPage( ((totalRecords % offset === 0 && totalRecords !== 0) ? parseInt(totalRecords / offset) : (parseInt(totalRecords / offset) + 1)))}/>}
            </Pagination>
            
        </>
    );
}

export default MovieList;