const mongoDriver = require("../../Mongo");
const Review = require("../models/review");

async function getReviewEmbedded(id, movieId){
    try {
        let elt_to_return =[]
        // Connect to the MongoDB cluster
        let db = await mongoDriver.mongo();
        let movie = await db.collection("movies").findOne({_id: movieId})
        console.log(movieId)
        movie['reviews'].forEach( x => {
            if (x._id === id){
                elt_to_return = [x, movie['reviews'].indexOf(x)]
            }
        })
        return elt_to_return
    } catch (e) {
        console.log(e);
    }
}

async function getReview(id, movieId){
    try {
        // Connect to the MongoDB cluster
        console.log(movieId)
        let db = await mongoDriver.mongo();
        let review = await db.collection("reviews").findOne({_id: id});
        if (review == null){
            let embedded_rev = await getReviewEmbedded(id, movieId)
            return embedded_rev[0]
        }else{
            return review
        }

    } catch (e) {
        console.log(e);
    }
}

async function findReviewsOfMovie (movieId){
    try {
        // Connect to the MongoDB cluster
        let db = await mongoDriver.mongo();
        let movie = await db.collection("movies").findOne({_id: movieId});
        return reviews = movie["reviews"]

    } catch (e) {
        console.log(e);
    }
}

async function createReview (user_id, movieId, title, rating, review_summary, review_detail){
    try{
        let db = await mongoDriver.mongo();
        let tot = await db.collection("reviews").count() + 15704481 + 1;
        let newReview = new Review({
            _id: "rw" + tot,
            userId: user_id,
            movieId: movieId,
            rating: rating,
            title: title,
            review_summary: review_summary,
            review_detail:review_detail,
        })
        let movie = await db.collection("movies").findOne({_id: movieId})
        if ((movie['reviews']).length >= 20){
            movie['reviews'].push(newReview)
            let oldest_rev = movie['reviews'][0]
            await db.collection("reviews").insertOne(oldest_rev)
            movie['reviews'].shift()
            await db.collection("movies").replaceOne({_id: movieId}, movie)
        } else{
            movie['reviews'].push(newReview)
        }
        await db.collection("movies").replaceOne({_id: movieId}, movie)
        return newReview;
    } catch (e) {
        console.log(e);
    }
}

async function deleteReview (id, movieId){
    try{
        let db = await mongoDriver.mongo();
        let review_to_delete = await db.collection("reviews").findOne({_id: id});
        if (review_to_delete == null){
            let movie = await db.collection("movies").findOne({_id: movieId});
            let x = await getReviewEmbedded(id, movieId)
            movie['reviews'].splice(x[1], 1)
            await db.collection("movies").replaceOne({_id: movieId}, movie)
        } else{
            await db.collection("reviews").deleteOne(review_to_delete)
        }
        // await db.collection("reviews").deleteOne(review_to_delete)

    } catch (e) {
        console.log(e);
    }
}


module.exports = {getReview, createReview, deleteReview, findReviewsOfMovie};

