const mongo = require("mongoose");

const Schema = mongo.Schema;

const movieSchema = new Schema ({
    budget:{
        type: Number
    },
    cast:{
        type: Array
    },
    genres:{
        type: Array
    },
    imdb_id:{
        type: String,
        required: [true, 'ImdbId is required']
    },
    overview:{
        type: String
    },
    popularity:{
        type: Number
    },
    poster_path:{
        type: String
    },
    release_date:{
        type: String
    },
    revenue:{
        type: Number
    },
    runtime:{
        type: Number
    },
    spoken_language:{
        type: Array
    },
    title:{
        type: String
    },
    vote_average:{
        type: Number
    },
    vote_count:{
        type: Number
    }
});
const Movie = mongo.model('movie', movieSchema);
module.exports ={Movie};