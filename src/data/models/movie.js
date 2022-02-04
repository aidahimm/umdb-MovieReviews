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
const Movie = mongo.model('movie', movieSchema);
module.exports = Movie;