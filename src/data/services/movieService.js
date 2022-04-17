const mongoDriver = require("../../Mongo");
const {Movie} = require("../models/movie");

async function findMovieByID(id){
    try {
        // Connect to the MongoDB cluster
        let db = await mongoDriver.mongo();
        return await db.collection("movies").findOne({_id: id});
    } catch (e) {
        throw(e);
    }
}

async function findMovieByApproximateTitle(title){
    try{
        let db = await mongoDriver.mongo();
        return await db.collection("movies").find({title:{'$regex' : title, '$options' : 'i'}},
            {projection: {'title':1, 'poster_path':1, 'vote_average':1}}).toArray();
    } catch (e) {
        throw(e);
    }
}

async function findMovieByGenre(genre){
    try{
        let db = await mongoDriver.mongo();
        return await db.collection("movies").find({genres:{'$regex' : genre, '$options' : 'i'}},
            {projection: {'title':1, 'poster_path':1, 'vote_average':1}}).limit(20).toArray();
    } catch (e) {
        throw(e);
    }
}

async function findMovieByRuntime(startRuntime, endRuntime){
    try{
        let db = await mongoDriver.mongo();
        return await db.collection("movies").find(
            {runtime: {'$gte': parseInt(startRuntime), '$lte': parseInt(endRuntime)}},
            {projection: {'title':1, 'poster_path':1, 'vote_average':1}}).limit(20).toArray();
    } catch (e) {
        throw(e);
    }
}

async function findMovieByRelDate(startDate, endDate){
    try{
        let db = await mongoDriver.mongo();
        return await db.collection("movies").find({release_date: {'$gte': new Date(startDate), '$lte': new Date (endDate)}},
            {projection: {'title':1, 'poster_path':1, 'vote_average':1}}).limit(20).toArray();
    } catch (e) {
        throw(e);
    }
}

async function findMovieByLanguage (lang){
    try{
        let db = await mongoDriver.mongo();
        return await db.collection("movies").find({spoken_languages: {'$regex' : lang, '$options' : 'i'}},
            {projection: {'title':1, 'poster_path':1, 'vote_average':1}}).limit(20).toArray();
    } catch (e) {
        throw(e);
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
        throw(e);
    }
}

async function deleteMovie (id){
    try{
        let db = await mongoDriver.mongo();
        await db.collection("movies").deleteOne({_id: id});
    } catch (e) {
        throw(e);
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
        throw(e);
    }
}

async function getPopMoviesByGenre(genre, pagenum){
    try {
        let db = await mongoDriver.mongo();
        let skipped = (pagenum-1)* 30
        return movies = await db.collection("movies").aggregate([
            {$match: {genres: {'$regex' : genre, '$options' : 'i'}}},
            {$sort: {popularity: -1}},
            {$project: {title:1, poster_path:1, vote_average:1}}
        ]).skip(skipped).limit(30).toArray();
    } catch (e) {
        throw(e);
    }
}

async function getTopMoviesByYear(year, pagenum){
    try {
        let skipped = (pagenum-1)* 30
        let reqYear = new Date (year + '-01-01T00:00:00.000+00:00')
        let yearLimit = new Date (parseInt(year)+1 + '-01-01T00:00:00.000+00:00')
        let db = await mongoDriver.mongo();
        return movies = await db.collection("movies").aggregate([
            {$match: {release_date: {'$gte': reqYear, '$lt': yearLimit}}},
            {$sort: {vote_average: -1}},
            {$project: {title:1, poster_path:1, vote_average:1, release_date:1}}
        ]).skip(skipped).limit(30).toArray();
    } catch (e) {
        throw(e);
    }
}

async function getTopMoviesByYearAndGenre (year, pagenum, genre){
    try {
        let skipped = (pagenum-1)* 30
        let reqYear = new Date (year + '-01-01T00:00:00.000+00:00')
        let yearLimit = new Date (parseInt(year)+1 + '-01-01T00:00:00.000+00:00')
        let db = await mongoDriver.mongo();
        return movies = await db.collection("movies").aggregate([
            {$match: {
                $and: [
                {release_date: {'$gte': reqYear, '$lt': yearLimit}},
                {genres: {'$regex': genre, '$options': 'i'}}
                ]
            }},
            {$sort: {vote_average: -1}},
            {$project: {title:1, poster_path:1, vote_average:1, release_date:1}}
        ]).skip(skipped).limit(30).toArray();
    } catch (e) {
        throw(e);
    }
}



module.exports = {
    findMovieByID,
    findMovieByApproximateTitle,
    findMovieByGenre,
    findMovieByRelDate,
    findMovieByRuntime,
    findMovieByLanguage,
    getTopMoviesByYear,
    getTopMoviesByYearAndGenre,
    createMovie,
    deleteMovie,
    getPopMovies,
    getPopMoviesByGenre};

