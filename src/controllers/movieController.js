const moviesService = require("../data/services/movieService");


async function getMovie (req, res) {
    try {
        let movie = await moviesService.getMovie();
        return res.status(200).json({ movie: movie, message: "Service Executed Successfully" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
module.exports = {getMovie};