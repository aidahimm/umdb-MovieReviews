const mongoDriver = require("../../Mongo");
const {Movie} = require("../models/movie");

async function getPopMovies(){
    try {
        let db = await mongoDriver.mongo();
        return movies = await db.collection("movies").aggregate([
            {$sort: {popularity: -1}}
            ]).limit(30).toArray();
    } catch (e) {
        console.log(e);
    }
}

async function getPopMoviesByGenre(genre){
    try {
        let db = await mongoDriver.mongo();
        return movies = await db.collection("movies").aggregate([
            {$match: {genres: {'$regex' : genre, '$options' : 'i'}}},
            {$sort: {popularity: -1}}
        ]).limit(30).toArray();
    } catch (e) {
        console.log(e);
    }
}

async function findMovieByID(id){
    try {
        // Connect to the MongoDB cluster
        let db = await mongoDriver.mongo();
        return await db.collection("movies").findOne({imdb_id: id});
    } catch (e) {
        console.log(e);
    }
}

async function findMovieByApproximateTitle(title){
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
        return await db.collection("movies").find({genres:{'$regex' : genre, '$options' : 'i'}}).limit(20).toArray();
    } catch (e) {
        console.log(e);
    }
}

async function createMovie (budget, casts, genres, imdb_id, overview, popularity, poster, release_date, revenue, runtime, lang, title, vote_average, vote_count){
    try{
        let db = await mongoDriver.mongo();
        let newMovie = new Movie({
            budget: budget,
            cast: casts,
            genres: genres,
            imdb_id: imdb_id,
            overview: overview,
            popularity: popularity,
            poster_path: poster,
            release_date: release_date,
            revenue: revenue,
            runtime: runtime,
            spoken_language: lang,
            title: title,
            vote_average: vote_average,
            vote_count: vote_count
        })
        await db.collection("movies").insertOne(newMovie);
        return newMovie;
    } catch (e) {
        console.log(e);
    }
}

async function updateMovieRating (movieID, rating) {
    try{
        let movie = await findMovieByID(movieID);
        let newAvgRating = ((movie.vote_average * movie.vote_count)+ parseInt(rating))/ (movie.vote_count +1);
        let newNumVotes = (movie.vote_count +1);
        let update = {vote_average: parseInt(newAvgRating.toFixed(1)), vote_count: newNumVotes};

        let db = await mongoDriver.mongo();
        await db.collection("movies").updateOne({imdb_id: movieID}, {$set: update});
    } catch (e) {
        console.log(e);
    }
}

async function deleteMovie (id){
    try{
        let db = await mongoDriver.mongo();
        await db.collection("movies").deleteOne({imdb_id: id});
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    findMovieByID,
    findMovieByApproximateTitle,
    findMovieByGenre,
    createMovie,
    updateMovieRating,
    deleteMovie,
    getPopMovies,
    getPopMoviesByGenre};

//{findMovieByID, getHomeMovies, findMovieByTitle, createMovie, findMovieByGenre, updateMovieRating, deleteMovie};
