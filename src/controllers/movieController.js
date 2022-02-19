const moviesService = require("../data/services/movieService");
///
async function findMovieByID (req, res) {
    try {
        let movie = await moviesService.findMovieByID(req.body.imdb_id);
        return res.status(200).json({ movie: movie, message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
///
async function getPopMovies (req, res) {
    try {
        let movies = await moviesService.getPopMovies();
        return res.render('index', { movies: movies, message: "Task executed successfully" });

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
///
async function getPopMoviesByGenre (req, res) {
    try {
        let movies = await moviesService.getPopMoviesByGenre(req.body.genre);
        return res.status(200).json({ movies: movies, message: "Task executed successfully" });

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function findMovieByApproximateTitle (req, res) {
    try {
        let movies = await moviesService.findMovieByApproximateTitle(req.body.title);
        return res.status(200).json({ movies: movies, message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
///
async function findMovieByGenre (req, res) {
    try {
        let movies = await moviesService.findMovieByGenre(req.body.genre);
        return res.status(200).json({ movies: movies, message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
///
async function createMovie (req,res){
    try {
        let movie = await moviesService.createMovie(req.body.budget, req.body.casts, req.body.genres, req.body.imdb_id, req.body.overview, req.body.popularity, req.body.poster, req.body.release_date, req.body.revenue, req.body.runtime, req.body.lang, req.body.title, req.body.vote_average, req.body.vote_count);
        return res.status(200).json({ message: "Successfully created movie:", movie: movie});

    }catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
///
async function updateMovieRating (req, res) {
    try {
        await moviesService.updateMovieRating(req.body.movieID, req.body.rating);
        return res.status(200).json({ message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
///
async function deleteMovie(req, res) {
    try {
        await moviesService.deleteMovie(req.body.imdb_id);
        return res.status(200).json({ message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
///
module.exports = {findMovieByID, findMovieByApproximateTitle, createMovie, findMovieByGenre, updateMovieRating, deleteMovie, getPopMoviesByGenre, getPopMovies};