const mongoDriver = require("../../Mongo");
const Review = require("../models/review");

async function getReview(userID){
    try {
        // Connect to the MongoDB cluster
        let db = await mongoDriver.mongo();
        return reviews = await db.collection("reviews").find({user_id: userID}).toArray();
    } catch (e) {
        console.log(e);
    }
}

async function findReviewsByMovie (id){
    try {
        // Connect to the MongoDB cluster
        let db = await mongoDriver.mongo();
        return reviews = await db.collection("reviews").find({imdb_id: id}).toArray();
    } catch (e) {
        console.log(e);
    }
}

async function createReview (user_id, imdb_id, title, rating, review_summary, review_detail){
    try{
        let db = await mongoDriver.mongo();
        let tot = await db.collection("reviews").count() + 15704481 + 1;
        let newReview = new Review({
            review_id: "rw" + tot,
            user_id: user_id,
            imdb_id: imdb_id,
            rating: rating,
            title: title,
            review_summary: review_summary,
            review_detail:review_detail
        })
        await db.collection("reviews").insertOne(newReview);
        return newReview;
    } catch (e) {
        console.log(e);
    }
}

async function deleteReview (id){
    try{
        let db = await mongoDriver.mongo();
        await db.collection("reviews").deleteOne({review_id: id});
    } catch (e) {
        console.log(e);
    }
}


module.exports = {getReview, createReview, deleteReview, findReviewsByMovie};

