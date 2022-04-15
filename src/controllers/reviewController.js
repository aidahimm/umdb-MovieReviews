const reviewService = require("../data/services/reviewService");


async function getReview (req, res) {
    try {
        let reviews = await reviewService.getReview(req.body._id);
        return res.status(200).json({review : reviews, message: "Service Executed Successfully" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
//
async function findReviewsOfMovie (req, res) {
    try {
        let reviews = await reviewService.findReviewsOfMovie(req.body.movieId);
        return res.status(200).json({review : reviews, message: "Service Executed Successfully" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
//
async function createReview (req, res) {
    try {
        let review = await reviewService.createReview(req.body.userId, req.body.movieId, req.body.title, req.body.rating, req.body.review_summary, req.body.review_detail);
        return res.status(200).json({message: "Successfully created review:", review: review })

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
//
async function deleteReview (req, res) {
    try {
        await reviewService.deleteReview(req.body._id, req.body.movieId);
        return res.status(200).json({message: "Service Executed Successfully" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

module.exports = {getReview, createReview, deleteReview, findReviewsOfMovie};