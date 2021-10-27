import { getReviews } from "../../Services/ReviewManagementService";
import React, {Fragment} from 'react';

const Reviews = async (movieId, page) => {
    try{
        let reviewList = await getReviews(movieId, page);
    }
    catch{

    }

    return
    <React.Fragment>

    </React.Fragment>

}

export default Reviews;