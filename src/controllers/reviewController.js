const reviewService = require("../data/services/reviewService");


async function getReview (req, res) {
    try {
        let review = await reviewService.getReview();
        return res.status(200).json({review : review, message: "Service Executed Successfully" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}


module.exports = {getReview};