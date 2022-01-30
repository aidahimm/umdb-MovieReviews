const mongoDriver = require("../../Mongo");

async function getMovie(){
    try {
        // Connect to the MongoDB cluster
        let db = await mongoDriver.mongo();
        let movieFound = await db.collection("movies").findOne({movieID:1});
        console.log(movieFound);
        return movieFound;
    } catch (e) {
        console.log(e);
    }
}

async function getAllMovies(){
    try {
        // Connect to the MongoDB cluster
        let db = await mongoDriver.mongo();
        return movies = await db.collection("movies").find().limit(10).toArray();
    } catch (e) {
        console.log(e);
    }
}


module.exports = {getMovie, getAllMovies};

