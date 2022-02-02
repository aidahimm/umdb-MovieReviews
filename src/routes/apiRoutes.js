const express = require('express');
const router = express.Router();
<<<<<<< HEAD

const movieController = require('../controllers/movieController');
const userController = require('../controllers/userController');
const reviewController = require("../controllers/reviewController");

const adminController=require('../controllers/adminCotroller')

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

=======
const reviewController = require("../controllers/reviewController");

>>>>>>> 70d7a0abf53ddf8813596e06def49f6df2042430
router.get('/review', (req,res)=>{
    reviewController.getReview(req,res).then();
});
router.get('/admis', (req,res)=>{
    reviewController.getAdmis(req,res).then();
});
module.exports = router;