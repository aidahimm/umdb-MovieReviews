const mongo = require("mongoose");
const Schema = mongo.Schema;

const reviewSchema = new Schema ({
    review_id:{
        type: String
    },
    user_id:{
        type: String,
        required: [true, 'Reviewer userID is required']
    },
    imdb_id:{
        type: String,
        required: [true, 'Movie title is required']
    },
    rating:{
        type: Number,
        required: [true, 'Rating is required']
    },
    review_summary:{
        type: String,
        required: [true, 'Review summary is required']
    },
    review_date:{
        type: Date,
        default: Date.now().toString()
    },
    review_detail:{
        type: String,
        required: [true, 'Review detail is required']
    },
    title:{
        type: String
    }
});

const Review = mongo.model('review', reviewSchema);

module.exports = Review;