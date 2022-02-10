const mongoDriver = require("../../Mongo");
const request = require("request");
const Movie = require("../models/movie");

var element = {};
var posters = [];

async function getBody(body){
    let json = JSON.parse(body);
    element={title: json["Title"], poster: json["Poster"]};
    posters.push(element);
}

async function getPostersByID(id){
    request({
        uri: 'http://www.omdbapi.com/?',
        qs: {
            apikey: '6fe3a4fe',
            i: id
        }
    }, (err, res, body)=>{
        getBody(body);
    });
}

async function getHomeMovies(){
    try {
        let db = await mongoDriver.mongo();
        let movies = await db.collection("movies").find({numVotes: {$gte : 1100000}}).limit(30).toArray();
        for (let movie of movies){
            let id = movie.imdbId;
            await getPostersByID(id);
        }
        return posters;
    } catch (e) {
        console.log(e);
    }
}

async function findMovieByID(id){
    try {
        // Connect to the MongoDB cluster
        let db = await mongoDriver.mongo();
        return await db.collection("movies").findOne({movieID: parseInt(id)});
    } catch (e) {
        console.log(e);
    }
}

async function findMovieByTitle(title){
    try{
        let db = await mongoDriver.mongo();
        return await db.collection("movies").find({title:{'$regex' : title, '$options' : 'i'}}).toArray();
    } catch (e) {
        console.log(e);
    }
}

async function findMovieByGenre(genre){
    try{
        let db = await mongoDriver.mongo();
        return await db.collection("movies").find({genres:{'$regex' : genre, '$options' : 'i'}}).toArray();
    } catch (e) {
        console.log(e);
    }
}

async function createMovie (title, genres, imdbId, avgr, numv){
    try{
        let db = await mongoDriver.mongo();
        let tot = await db.collection("movies").count() +1;
        let newMovie = new Movie({
            movieID: tot,
            title: title,
            genres: genres,
            imdbId: imdbId,
            avgRating: avgr,
            numVotes: numv
        })
        await db.collection("movies").insertOne(newMovie);
    } catch (e) {
        console.log(e);
    }
}

async function updateMovieRating (movieID, rating) {
    try{
        let movie = await findMovieByID(movieID);
        let newAvgRating = ((movie.avgRating * movie.numVotes)+ parseInt(rating))/ (movie.numVotes +1);
        let newNumVotes = (movie.numVotes +1);
        let update = {avgRating: parseInt(newAvgRating.toFixed(1)), numVotes: newNumVotes};

        let db = await mongoDriver.mongo();
        await db.collection("movies").updateOne({movieID: parseInt(movieID)}, {$set: update});
    } catch (e) {
        console.log(e);
    }
}

async function deleteMovie (id){
    try{
        let db = await mongoDriver.mongo();
        await db.collection("movies").deleteOne({movieID: parseInt(id)});
    } catch (e) {
        console.log(e);
    }
}

//Find how many watching lists a movie was added to
async function MovieInLWatchlists(id){
    try{
        //filter watching lists by movieID
        //get number of matched watching list documents
        //return number [popularity of the movie]
    } catch (e) {
        console.log(e);
    }
}
module.exports = {getHomeMovies, findMovieByID,findMovieByTitle, findMovieByGenre, createMovie, updateMovieRating, deleteMovie};

//{findMovieByID, getHomeMovies, findMovieByTitle, createMovie, findMovieByGenre, updateMovieRating, deleteMovie};
