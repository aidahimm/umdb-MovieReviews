const reviewService = require("../data/services/reviewService");


async function getReview (req, res) {
    try {
        let reviews = await reviewService.getReview(req.body.user_id);
        return res.status(200).json({review : reviews, message: "Service Executed Successfully" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
//
async function findReviewsByMovie (req, res) {
    try {
        let reviews = await reviewService.findReviewsByMovie(req.body.imdb_id);
        return res.status(200).json({review : reviews, message: "Service Executed Successfully" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
//
async function createReview (req, res) {
    try {
        let review = await reviewService.createReview(req.body.user_id, req.body.imdb_id, req.body.title, req.body.rating, req.body.review_summary, req.body.review_detail);
        return res.status(200).json({message: "Successfully created review:", review: review })

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
//
async function deleteReview (req, res) {
    try {
        await reviewService.deleteReview(req.body.review_id);
        return res.status(200).json({message: "Service Executed Successfully" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

module.exports = {getReview, createReview, deleteReview, findReviewsByMovie};