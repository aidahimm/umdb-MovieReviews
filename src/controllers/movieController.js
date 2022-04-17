const moviesService = require("../data/services/movieService");
///
async function findMovieByID (req, res) {
    try {
        let movie = await moviesService.findMovieByID(req.body._id);
        return res.status(200).json({ movie: movie, message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
///
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
async function findMovieByRuntime (req, res) {
    try {
        let movies = await moviesService.findMovieByRuntime(req.body.startRuntime, req.body.endRuntime);
        return res.status(200).json({ movies: movies, message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
///
async function findMovieByRelDate (req, res) {
    try {
        let movies = await moviesService.findMovieByRelDate(req.body.startDate, req.body.endDate);
        return res.status(200).json({ movies: movies, message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
///
async function findMovieByLanguage (req, res) {
    try {
        let movies = await moviesService.findMovieByLanguage(req.body.lang);
        return res.status(200).json({ movies: movies, message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
///
async function createMovie (req,res){
    try {
        let movie = await moviesService.createMovie(req.body.budget, req.body.casts, req.body.genres, req.body._id, req.body.overview, req.body.popularity, req.body.poster, req.body.release_date, req.body.revenue, req.body.runtime, req.body.lang, req.body.title, req.body.vote_average, req.body.vote_count);
        return res.status(200).json({ message: "Successfully created movie:", movie: movie});

    }catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

///
async function deleteMovie(req, res) {
    try {
        await moviesService.deleteMovie(req.body._id);
        return res.status(200).json({ message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
///AGGREGATIONS

async function getPopMovies (req, res) {
    try {
        let movies = await moviesService.getPopMovies(req.body.page);
        return res.status(200).json({ movies: movies, message: "Task executed successfully" });
        // return res.render('index', { movies: movies, message: "Task executed successfully" });

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
///
async function getPopMoviesByGenre (req, res) {
    try {
        let movies = await moviesService.getPopMoviesByGenre(req.body.genre, req.body.page);
        return res.status(200).json({ movies: movies, message: "Task executed successfully" });

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
///
async function getTopMoviesByYear (req, res) {
    try {
        let movies = await moviesService.getTopMoviesByYear(req.body.year, req.body.page);
        return res.status(200).json({ movies: movies, message: "Task executed successfully" });
        // return res.render('index', { movies: movies, message: "Task executed successfully" });

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
async function getTopMoviesByYearAndGenre (req, res) {
    try {
        let movies = await moviesService.getTopMoviesByYearAndGenre(req.body.year, req.body.page, req.body.genre);
        return res.status(200).json({ movies: movies, message: "Task executed successfully" });
        // return res.render('index', { movies: movies, message: "Task executed successfully" });

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
module.exports = {findMovieByID, findMovieByApproximateTitle, createMovie, findMovieByGenre, findMovieByLanguage, findMovieByRuntime, getTopMoviesByYearAndGenre, findMovieByRelDate, getTopMoviesByYear, deleteMovie, getPopMoviesByGenre, getPopMovies};