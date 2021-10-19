export const getReviews = async (movieId) =>{
    const baseUrl = process.env.REACT_APP_REVIEWS_MANAGEMENT_BASE_URL;

    let response = await fetch(baseUrl + '/getmoviereviews/' + movieId);
    if (response.status !== 200){
        throw new Error('response is not 200');
    }
        
    return await response.json();
}

export const addMovieReviews = async (movieId, username, rating, comment) =>{
    const baseUrl = process.env.REACT_APP_REVIEWS_MANAGEMENT_BASE_URL;
    let review = {movieId, username, rating, comment};
    let response = await fetch(baseUrl + '/addreview',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });

    
    if (response.status !== 201){
        throw new Error('Response is not 201 created');
    }    
}