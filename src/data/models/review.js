const mongo = require("mongoose");

const Schema = mongo.Schema;

const reviewSchema = new Schema ({
    review_id:{
        type: String,
        required: [true, 'ReviewID is required']
    },
    reviewer:{
        type: String,
        required: [true, 'Reviewer userID is required']
    },
    movie:{
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
        default: Date.now()
    },
    spoiler_tag:{
        type: Number,
        default: 0
    },
    review_detail:{
        type: String,
        required: [true, 'Review detail is required']
    },
    helpful:{
        type: Array,
        default: [0,0]
    }


});

const Review = mongo.model('review', reviewSchema);

module.exports = Review;