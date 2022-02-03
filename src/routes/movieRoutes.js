const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/movie', (req,res)=>{
    movieController.findMovieByID(req,res).then();
});

router.get('/movies', (req,res)=>{
    movieController.getHomeMovies(req,res).then();
});

router.post('/tsearch', (req,res)=>{
    movieController.findMovieByTitle(req,res).then();
});

router.post('/gsearch', (req,res)=>{
    movieController.findMovieByGenre(req,res).then();
});

router.post('/crtmov', (req,res)=>{
    movieController.createMovie(req,res).then();
});

router.put('/updmovr', (req,res)=>{
    movieController.updateMovieRating(req,res).then();
});

router.delete('/delmov', (req,res) =>{
    movieController.deleteMovie(req,res).then();
})


module.exports = router;