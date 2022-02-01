const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
var request = require('request');

router.get('/movie', (req,res)=>{
    movieController.getMovie(req,res).then();
});

router.get('/apimovie', function(req, res) {
    request({
        uri: 'http://www.omdbapi.com/?',
        qs: {
            apikey: '6fe3a4fe',
            i: "tt4154796"
        }
    }).pipe(res);
});

router.get('/movies', (req,res)=>{
    movieController.getAllMovies(req,res).then();
});

module.exports = router;