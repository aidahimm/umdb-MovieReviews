const moviesService = require("../data/services/movieService");
///
async function getMovie (req, res) {
    try {
        let movie = await moviesService.getMovie();
        return res.status(200).json({ movie: movie, message: "Task executed successfully"});
        //json({ movie: movie, message: "Service Executed Successfully" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
<<<<<<< HEAD
///
async function getAllMovies (req, res) {
=======

async function getHomeMovies (req, res) {
>>>>>>> 70d7a0abf53ddf8813596e06def49f6df2042430
    try {
        let movies = await moviesService.getHomeMovies();
        return res.render('index', { movies: movies, title: 'All movies' });
        //json({ movie: movie, message: "Service Executed Successfully" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
<<<<<<< HEAD
module.exports = {getMovie, getAllMovies};
=======


module.exports = {getMovie, getHomeMovies};
>>>>>>> 70d7a0abf53ddf8813596e06def49f6df2042430
