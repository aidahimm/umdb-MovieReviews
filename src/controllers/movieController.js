const moviesService = require("../data/services/movieService");


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
module.exports = {getMovie};
=======

async function getAllMovies (req, res) {
    try {
        let movies = await moviesService.getAllMovies();
        return res.render('index', { movies: movies, title: 'All movies' });
        //json({ movie: movie, message: "Service Executed Successfully" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}


module.exports = {getMovie, getAllMovies};
>>>>>>> c682c17033483e268405dba676d04a01c3cafcc8
