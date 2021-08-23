import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Pagination from 'react-bootstrap/Pagination';
import { Fragment, useEffect, useRef, useState } from 'react';
import AddMovie from './AddMovie';
import { getMovies } from '../Services/MovieManagementService';

function MovieList({categories, search}){
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesByRows, setMoviesByRows] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [showAddModal, setShowAddMovieModal] = useState(false);

    const offset = 6;

    const prevCategories = useRef();
    const prevSearch = useRef();
    const prevAddModalState = useRef();

    useEffect(() =>{
        (async function(){
            try{
                //regrabbing because categories changed, if that is the case, reset page to 1
                if (prevCategories.current !== categories){
                    prevCategories.current = categories;
                    setCurrentPage(1);
                }

                //regrabbing because search changed, if that is the case, reset page to 1
                if (prevSearch.current !== search){
                    prevSearch.current = search;
                    setCurrentPage(1);
                }

                //regrabbing because add modal state change, if that is the case, only grab if its state change from open to close
                if (prevAddModalState.current !== showAddModal){
                    let tmp = prevAddModalState.current;
                    prevAddModalState.current = showAddModal;
                    //close to open, do not regrab
                    if (tmp === false && prevAddModalState.current === true){
                        return;
                    }
                }
                
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
                alert('Failed to load movie with error: ' + e.message);
            }
        })()
    }, [currentPage, categories, search, showAddModal]);

    const setModalState = (state) =>{
        setShowAddMovieModal(state);
    };

    return(
        <>
            <AddMovie showModal={showAddModal} setModal={setModalState}/>
            <Row>
                <Col lg="10">
                    <h1>Movies</h1>
                </Col>
                <Col lg="2">
                    <Button variant="dark" onClick={ ()=> setModalState(true) }>Add Movie</Button>
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