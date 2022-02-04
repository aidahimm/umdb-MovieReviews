const moviesService = require("../data/services/movieService");


async function findMovieByID (req, res) {
    try {
        let movie = await moviesService.findMovieByID(req.body.movieID);
        return res.status(200).json({ movie: movie, message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function getHomeMovies (req, res) {
    try {
        let movies = await moviesService.getHomeMovies();
        return res.render('index', { movies: movies, message: "Task executed successfully" });

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function findMovieByTitle (req, res) {
    try {
        let movies = await moviesService.findMovieByTitle(req.body.title);
        return res.status(200).json({ movies: movies, message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function findMovieByGenre (req, res) {
    try {
        let movies = await moviesService.findMovieByGenre(req.body.genre);
        return res.status(200).json({ movies: movies, message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function createMovie (req,res){
    try {
        await moviesService.createMovie(req.body.title, req.body.genres, req.body.imdbId, req.body.avgRating, req.body.numVotes);
        return res.status(200).json({ message: "Task executed successfully"});

    }catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function updateMovieRating (req, res) {
    try {
        await moviesService.updateMovieRating(req.body.movieID, req.body.rating);
        return res.status(200).json({ message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function deleteMovie(req, res) {
    try {
        await moviesService.deleteMovie(req.body.movieID);
        return res.status(200).json({ message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

module.exports = {findMovieByID, getHomeMovies, findMovieByTitle, createMovie, findMovieByGenre, updateMovieRating, deleteMovie};
