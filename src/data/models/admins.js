const mongo = require("mongoose");

const Schema = mongo.Schema;

const adminsSchema = new Schema ({
    adminsID:{
        type: Number,
        required: [true, 'Admins Id  is required']
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

const Admins = mongo.model('movie', adminsSchema);

module.exports = Admins;