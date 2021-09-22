export const getMovies = async function(categories, search, page, offset){
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
        throw new Error('response is not 200');
    }

    return await response.json();
}

export const getGenres = async function(){
    const baseUrl = process.env.REACT_APP_MOVIES_MANAGEMENT_BASE_URL;
    const response = await fetch(baseUrl + '/genres');
    
    if (response.status !== 200){
        throw new Error('response is not 200');
    }
    
    return await response.json();
}

export const addNewMovie = async function(name, description, genreId, yearReleased, pictureBase64String){
    const baseUrl = process.env.REACT_APP_MOVIES_MANAGEMENT_BASE_URL;

    var data = { name, genreId: parseInt(genreId), description, yearReleased: parseInt(yearReleased), picture: pictureBase64String};   
    var response = await fetch(baseUrl + '/movies/new',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    if (response.status !== 201){
        throw new Error('Response is not 201 created');
    }               
}