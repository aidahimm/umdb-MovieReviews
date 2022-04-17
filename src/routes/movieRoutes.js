const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
////////
router.post('/movie', (req,res)=>{
    movieController.findMovieByID(req,res).then();
});
//////
router.post('/tsearch', (req,res)=>{
    movieController.findMovieByApproximateTitle(req,res).then();
});
//////
router.post('/gsearch', (req,res)=>{
    movieController.findMovieByGenre(req,res).then();
});
///
router.post('/lsearch', (req,res)=>{
    movieController.findMovieByLanguage(req,res).then();
});
///
router.post('/datesearch', (req,res)=>{
    movieController.findMovieByRelDate(req,res).then();
});
///
router.post('/rtsearch', (req,res)=>{
    movieController.findMovieByRuntime(req,res).then();
});
///
router.post('/pop', (req,res)=>{
    movieController.getPopMovies(req,res).then();
});
////
router.post('/topy', (req,res)=>{
    movieController.getTopMoviesByYear(req,res).then();
});
////
router.post('/topyg', (req,res)=>{
    movieController.getTopMoviesByYearAndGenre(req,res).then();
});
///
router.post('/popg', (req,res)=>{
    movieController.getPopMoviesByGenre(req,res).then();
});

//////
router.post('/crtmov', (req,res)=>{
    movieController.createMovie(req,res).then();
});
////////////
router.delete('/delmov', (req,res) =>{
    movieController.deleteMovie(req,res).then();
});


module.exports = router;