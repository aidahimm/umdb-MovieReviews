// ******************************************
//              Connect to Neo4j Database
// ******************************************
let neo4j = require('neo4j-driver');
let {creds } = require("./../config/noe4jcredentials");
let neo4jdbconnection = neo4j.driver(creds.bolt_url, neo4j.auth.basic(creds.neo4j_username, creds.neo4j_password));
//************************************************ */

const mongo = require("mongoose");

const Schema = mongo.Schema;

const movieSchema = new Schema ({
    movieID:{
        type: Number,
        required: [true, 'MovieID is required']
    },
    title:{
        type: String,
        required: [true, 'Title is required']
    },
    genres:{
        type: String,
        required: [true, 'Genre is required']
    },
    imdbId:{
        type: String,
        required: [true, 'ImdbId is required']
    },
    avgRating:{
        type: Number,
        required: [false]
    },
    numVotes:{
        type: Number,
        required: [false]
    }
});
const Neo4jMovie = mongo.model('movie', movieSchema);
module.exports ={Neo4jMovie};