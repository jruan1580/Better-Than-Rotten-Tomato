export const getReviews = async (movieId, page) =>{
    const baseUrl = process.env.REACT_APP_REVIEWS_MANAGEMENT_BASE_URL;

    const response = await fetch(baseUrl + '/getmoviereviews/' + movieId + '?page='+ page);
    if (response.status !== 200){
        throw new Error('response is not 200');
    }
    return response.json();
}

export const addMovieReviews = async (movieId, username, rating, comment) =>{
    const baseUrl = process.env.REACT_APP_REVIEWS_MANAGEMENT_BASE_URL;
    const data = {movieId: parseInt(movieId), username, rating: parseInt(rating), comment};
    const response = await fetch(baseUrl + '/addreview',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    
    if (response.status !== 201){
        throw new Error('Response is not 201 created');
    }    
}

export const getMovieSummary = async(movieId) => {
    const baseUrl = process.env.REACT_APP_REVIEWS_MANAGEMENT_BASE_URL;
    const response = await fetch(baseUrl + '/getmoviesummary/' + movieId);
    console.log(response);
    // if(response.status !== 200)
    // {
    //     throw new Error(`${response.status} is not 200`);
    // }

    // return response.json();

}
