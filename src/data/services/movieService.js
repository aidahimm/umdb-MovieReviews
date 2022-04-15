const mongoDriver = require("../../Mongo");
const {Movie} = require("../models/movie");

async function findMovieByID(id){
    try {
        // Connect to the MongoDB cluster
        let db = await mongoDriver.mongo();
        return await db.collection("movies").findOne({_id: id});
    } catch (e) {
        console.log(e);
    }
}

async function findMovieByApproximateTitle(title){
    try{
        let db = await mongoDriver.mongo();
        return await db.collection("movies").find({title:{'$regex' : title, '$options' : 'i'}},
            {projection: {'title':1, 'poster_path':1, 'vote_average':1}}).toArray();
    } catch (e) {
        console.log(e);
    }
}

async function findMovieByGenre(genre){
    try{
        let db = await mongoDriver.mongo();
        return await db.collection("movies").find({genres:{'$regex' : genre, '$options' : 'i'}},
            {projection: {'title':1, 'poster_path':1, 'vote_average':1}}).limit(20).toArray();
    } catch (e) {
        console.log(e);
    }
}

async function findMovieByCast(castMember){
    try{
        let db = await mongoDriver.mongo();
        return await db.collection("movies").find({cast:{'$regex' : castMember, '$options' : 'i'}},
            {projection: {'title':1, 'poster_path':1, 'vote_average':1}}).limit(20).toArray();
    } catch (e) {
        console.log(e);
    }
}

async function findMovieByRuntime(startRuntime, endRuntime){
    try{
        let db = await mongoDriver.mongo();
        return await db.collection("movies").find(
            {runtime: {'$gte': parseInt(startRuntime), '$lte': parseInt(endRuntime)}},
            {projection: {'title':1, 'poster_path':1, 'vote_average':1}}).limit(20).toArray();
    } catch (e) {
        console.log(e);
    }
}

async function findMovieByRelDate(startDate, endDate){
    try{
        let db = await mongoDriver.mongo();
        return await db.collection("movies").find({release_date: {'$gte': new Date(startDate), '$lte': new Date (endDate)}},
            {projection: {'title':1, 'poster_path':1, 'vote_average':1}}).limit(20).toArray();
    } catch (e) {
        console.log(e);
    }
}

async function findMovieByLanguage (lang){
    try{
        let db = await mongoDriver.mongo();
        return await db.collection("movies").find({spoken_languages: {'$regex' : lang, '$options' : 'i'}},
            {projection: {'title':1, 'poster_path':1, 'vote_average':1}}).limit(20).toArray();
    } catch (e) {
        console.log(e);
    }
}

async function createMovie (budget, casts, genres, _id, overview, popularity, poster, release_date, revenue, runtime, lang, title, vote_average, vote_count){
    try{
        let db = await mongoDriver.mongo();
        let newMovie = new Movie({
            budget: budget,
            cast: casts,
            genres: genres,
            _id: _id,
            overview: overview,
            popularity: popularity,
            poster_path: poster,
            release_date: release_date,
            revenue: revenue,
            runtime: runtime,
            spoken_languages: lang,
            title: title,
            vote_average: vote_average,
            vote_count: vote_count,
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
        await db.collection("movies").updateOne({_id: movieID}, {$set: update});
    } catch (e) {
        console.log(e);
    }
}

async function deleteMovie (id){
    try{
        let db = await mongoDriver.mongo();
        await db.collection("movies").deleteOne({_id: id});
    } catch (e) {
        console.log(e);
    }
}


/////// AGGREGATIONS

async function getPopMovies(pagenum){
    try {
        let db = await mongoDriver.mongo();
        let skipped = (pagenum-1)* 30
        return movies = await db.collection("movies").aggregate([
            {$sort: {popularity: -1}},
            {$project: {title:1, poster_path:1, vote_average:1}}
        ]).skip(skipped).limit(30).toArray();
    } catch (e) {
        console.log(e);
    }
}

async function getPopMoviesByGenre(genre){
    try {
        let db = await mongoDriver.mongo();
        return movies = await db.collection("movies").aggregate([
            {$match: {genres: {'$regex' : genre, '$options' : 'i'}}},
            {$sort: {popularity: -1}},
            {$project: {title:1, poster_path:1, vote_average:1}}
        ]).limit(30).toArray();
    } catch (e) {
        console.log(e);
    }
}

async function getTopMoviesByYear(year, k){
    try {
        let reqYear = new Date (year + '-01-01T00:00:00.000+00:00')
        let yearLimit = new Date (parseInt(year)+1 + '-01-01T00:00:00.000+00:00')
        let db = await mongoDriver.mongo();
        return movies = await db.collection("movies").aggregate([
            {$match: {release_date: {'$gte': reqYear, '$lt': yearLimit}}},
            {$sort: {vote_average: -1}},
            {$project: {title:1, poster_path:1, vote_average:1, release_date:1}}
        ]).limit(k).toArray();
    } catch (e) {
        console.log(e);
    }
}

async function getTopMoviesByYearAndGenre (year, k, genre){
    try {
        let reqYear = new Date (year + '-01-01T00:00:00.000+00:00')
        let yearLimit = new Date (parseInt(year)+1 + '-01-01T00:00:00.000+00:00')
        let db = await mongoDriver.mongo();
        return movies = await db.collection("movies").aggregate([
            {$match: {$and: [
                {release_date: {'$gte': reqYear, '$lt': yearLimit}},
                {genres: {'$regex': genre, '$options': 'i'}}
            ]}},
            {$sort: {vote_average: -1}},
            {$project: {title:1, poster_path:1, vote_average:1, release_date:1}}
        ]).limit(k).toArray();
    } catch (e) {
        console.log(e);
    }
}



module.exports = {
    findMovieByID,
    findMovieByApproximateTitle,
    findMovieByGenre,
    findMovieByCast,
    findMovieByRelDate,
    findMovieByRuntime,
    findMovieByLanguage,
    getTopMoviesByYear,
    getTopMoviesByYearAndGenre,
    createMovie,
    updateMovieRating,
    deleteMovie,
    getPopMovies,
    getPopMoviesByGenre};

