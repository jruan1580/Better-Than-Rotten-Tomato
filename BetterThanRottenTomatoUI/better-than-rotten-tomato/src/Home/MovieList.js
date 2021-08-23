import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Pagination from 'react-bootstrap/Pagination';
import { Fragment, useEffect, useReducer, useRef } from 'react';
import AddMovie from './AddMovie';
import { getMovies } from '../Services/MovieManagementService';
import Loading from '../Loading/Loading';


function reducer(state, action){
    switch(action.type){
        case 'setCurrentPage':
            return {...state, currentPage: action.payload};
        case 'setMoviesByRows':
            return {...state, moviesByRows: action.payload};
        case 'setTotalRecords':
            return {...state, totalRecords: action.payload};
        case 'setShowAddModal':
            return {...state, showAddModal: action.payload};
        case 'setShowLoading':
            return {...state, showLoading: action.payload};
        default:
            throw new Error('action not defined');
    }
}

const defaultState ={
    currentPage: 1,
    moviesByRows: [],
    totalRecords: 0,
    showAddModal: false,
    showLoading: true
};

function MovieList({categories, search}){
    const [state, dispatcher] = useReducer(reducer, defaultState);

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
                    dispatcher({type: 'setCurrentPage', payload: 1});
                }

                //regrabbing because search changed, if that is the case, reset page to 1
                if (prevSearch.current !== search){
                    prevSearch.current = search;
                    dispatcher({type: 'setCurrentPage', payload: 1});
                }

                //regrabbing because add modal state change, if that is the case, only grab if its state change from open to close
                if (prevAddModalState.current !== state.showAddModal){
                    let tmp = prevAddModalState.current;
                    prevAddModalState.current = state.showAddModal;
                    //close to open, do not regrab
                    if (tmp === false && prevAddModalState.current === true){
                        return;
                    }                    
                }
                
                dispatcher({type: 'setShowLoading', payload: true});
                var movieResp = await getMovies(categories, search, state.currentPage, offset); 
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
                
                dispatcher({type: 'setTotalRecords', payload: movieResp.totalRecords});
                dispatcher({type: 'setMoviesByRows', payload: allMoviesByRows});
                dispatcher({type: 'setShowLoading', payload: false});
            }catch(e){
                alert('Failed to load movie with error: ' + e.message);

                dispatcher({type: 'setShowLoading', payload: false});
            }
        })()
    }, [state.currentPage, categories, search, state.showAddModal]);

    const setModalState = (state) =>{
        dispatcher({type: 'setShowAddModal', payload: state});
    };

    return(
        <>
            <Loading show={state.showLoading}/>
            <AddMovie showModal={state.showAddModal} setModal={setModalState}/>
            <Row>
                <Col lg="10">
                    <h1>Movies</h1>
                </Col>
                <Col lg="2">
                    <Button variant="dark" onClick={ ()=> setModalState(true) }>Add Movie</Button>
                </Col>
            </Row><br/>
            {               
                state.moviesByRows.map((movieRow, index) => {                    
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
                {(state.currentPage !== 1 && state.moviesByRows.length > 0) && <Pagination.First onClick={() => dispatcher({type: 'setCurrentPage', payload: 1})} />}
                {(state.currentPage !== 1 && state.moviesByRows.length > 0) && <Pagination.Prev onClick={() => dispatcher({type: 'setCurrentPage', payload: (state.currentPage - 1)})} />}
                {(state.moviesByRows.length > 0 && state.currentPage !== ((state.totalRecords % offset === 0 && state.totalRecords !== 0) ? parseInt(state.totalRecords / offset) : (parseInt(state.totalRecords / offset) + 1))) && <Pagination.Next onClick={() => dispatcher({type: 'setCurrentPage', payload: (state.currentPage + 1)}) }/>}
                {(state.moviesByRows.length > 0 && state.currentPage !== ((state.totalRecords % offset === 0 && state.totalRecords !== 0) ? parseInt(state.totalRecords / offset) : (parseInt(state.totalRecords / offset) + 1))) &&<Pagination.Last onClick={() => dispatcher({type:'setCurrentPage', payload: ((state.totalRecords % offset === 0 && state.totalRecords !== 0) ? parseInt(state.totalRecords / offset) : (parseInt(state.totalRecords / offset) + 1))})}/>}
            </Pagination>
            
        </>
    );
}

export default MovieList;