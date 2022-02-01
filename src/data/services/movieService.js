const mongoDriver = require("../../Mongo");
const request = require("request");


var posters=[];
var element = {};

async function getMovie(){
    try {
        // Connect to the MongoDB cluster
        let db = await mongoDriver.mongo();
        return await db.collection("movies").findOne({movieID: 1});
    } catch (e) {
        console.log(e);
    }
}

async function getBody(body){
    let json = JSON.parse(body);
    element={title: json["Title"], poster: json["Poster"]};
    posters.push(element);
}

async function getPosters(id){
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
            getPosters(id);
        }
        return posters;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {getMovie, getHomeMovies, getPosters};

