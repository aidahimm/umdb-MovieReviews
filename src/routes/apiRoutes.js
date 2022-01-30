const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const userController = require('../controllers/userController');
const reviewController = require("../controllers/reviewController");

router.get('/', (req,res)=>{
    res.render('home');
});

router.get('/movie', (req,res)=>{
    movieController.getMovie(req,res).then();
});

router.get('/movies', (req,res)=>{
    movieController.getAllMovies(req,res).then();
});

router.get('/user', (req,res)=>{
    userController.getUser(req,res).then();
});

router.get('/review', (req,res)=>{
    reviewController.getReview(req,res).then();
});
module.exports = router;